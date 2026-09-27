import { ALAN_PERSON } from "akasha/alan/harness/notification-feed/modules/notifying/notifying.module.code.ts"
import {
  type NotifyInput,
  writeNotification,
} from "akasha/alan/harness/notification-feed/modules/rows/notification-feed-rows.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { turnReadySaid } from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { TURN_SENDER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const TURN_READY = "turn-ready"

const TITLE = "title"

const POSITION = "position"

export type Ready = {
  readonly game: string
  readonly storyId: string
  readonly title: string
  readonly turn: number | null
}

export type ReadyPushing = (root: string, game: string, turn: string) => Promise<string | null>

export function readyNotice(ready: Ready): NotifyInput {
  const link = buildPageHref({
    pageTypeSlug: toPageTypeSlug(storyPlayed.slug),
    slug: ready.game,
    fallbackSlugSource: null,
    id: ready.storyId,
  })
  return {
    title: ready.title,
    body: turnReadySaid(ready.turn),
    link,
    kind: TURN_READY,
    source: `${storyPlayed.slug}/${ready.game}`,
  }
}

function readyOf(root: string, game: string, turn: string): Ready | string {
  const listed = listedAt(root, storyPlayed.slug, game)[0]
  if (listed === undefined) return `\`${game}\` is no played story here`
  const story = valueAt(listed.path, root) ?? {}
  const position = valueAt(turn, root)?.[POSITION]
  return {
    game,
    storyId: listed.id,
    title: textAt(story, TITLE) ?? game,
    turn: typeof position === "number" ? position : null,
  }
}

export const readyNotified: ReadyPushing = async (root, game, turn) => {
  const ready = readyOf(root, game, turn)
  if (typeof ready === "string") return ready
  const wrote = await writeNotification(ALAN_PERSON, readyNotice(ready), TURN_SENDER)
  return wrote.ok ? null : wrote.why
}

export async function readyTold(
  push: ReadyPushing,
  root: string,
  game: string,
  turn: string,
  report: string[]
): Promise<undefined> {
  try {
    const why = await push(root, game, turn)
    report.push(why === null ? `pushed\t${game}` : `unpushed\t${why}`)
  } catch (thrown) {
    report.push(`unpushed\t${whyOf(thrown)}`)
  }
  return undefined
}
