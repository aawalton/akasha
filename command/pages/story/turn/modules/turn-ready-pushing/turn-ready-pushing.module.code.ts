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
import {
  CHAPTER,
  type Noun,
  STEP_SENDER,
  TURN,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const TURN_READY = "turn-ready"

const CHAPTER_READY = "chapter-ready"

const TITLE = "title"

const POSITION = "position"

const ID = "id"

const SLUG = "slug"

type Ready = {
  readonly game: string
  readonly storyId: string
  readonly title: string
  readonly turn: number | null
}

type ChapterReady = {
  readonly game: string
  readonly story: string
  readonly chapterId: string
  readonly chapterSlug: string
  readonly title: string | null
  readonly chapter: number | null
}

export type ReadyPushing = (
  root: string,
  game: string,
  at: string,
  noun: Noun
) => Promise<string | null>

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

export function chapterReadySaid(chapter: number | null, title: string | null): string {
  if (chapter === null && title === null) return "A new chapter is ready."
  if (chapter === null) return `${title} is ready.`
  if (title === null) return `Chapter ${chapter} is ready.`
  return `Chapter ${chapter}, ${title}, is ready.`
}

export function chapterNotice(ready: ChapterReady): NotifyInput {
  const link = buildPageHref({
    pageTypeSlug: toPageTypeSlug(storyChapterWritten.slug),
    slug: ready.chapterSlug,
    fallbackSlugSource: ready.title,
    id: ready.chapterId,
  })
  return {
    title: ready.story,
    body: chapterReadySaid(ready.chapter, ready.title),
    link,
    kind: CHAPTER_READY,
    source: `${storyWritten.slug}/${ready.game}`,
  }
}

function numberAt(at: string, root: string): number | null {
  const position = valueAt(at, root)?.[POSITION]
  return typeof position === "number" ? position : null
}

function readyOf(root: string, game: string, turn: string): Ready | string {
  const listed = listedAt(root, storyPlayed.slug, game)[0]
  if (listed === undefined) return `\`${game}\` is no played story here`
  const story = valueAt(listed.path, root) ?? {}
  return {
    game,
    storyId: listed.id,
    title: textAt(story, TITLE) ?? game,
    turn: numberAt(turn, root),
  }
}

function chapterReadyOf(root: string, game: string, at: string): ChapterReady | string {
  const listed = listedAt(root, storyWritten.slug, game)[0]
  if (listed === undefined) return `\`${game}\` is no written story here`
  const story = valueAt(listed.path, root) ?? {}
  const chapter = valueAt(at, root)
  if (chapter === null) return `\`${at}\` is no chapter here`
  const chapterId = textAt(chapter, ID)
  if (chapterId === null) return `\`${at}\` states no id, so no link reaches it`
  return {
    game,
    story: textAt(story, TITLE) ?? game,
    chapterId,
    chapterSlug: textAt(chapter, SLUG) ?? "",
    title: textAt(chapter, TITLE),
    chapter: numberAt(at, root),
  }
}

function noticeOver(root: string, game: string, at: string, noun: Noun): NotifyInput | string {
  if (noun === CHAPTER) {
    const ready = chapterReadyOf(root, game, at)
    return typeof ready === "string" ? ready : chapterNotice(ready)
  }
  const ready = readyOf(root, game, at)
  return typeof ready === "string" ? ready : readyNotice(ready)
}

export const readyNotified: ReadyPushing = async (root, game, at, noun) => {
  const notice = noticeOver(root, game, at, noun)
  if (typeof notice === "string") return notice
  const wrote = await writeNotification(ALAN_PERSON, notice, STEP_SENDER)
  return wrote.ok ? null : wrote.why
}

export async function readyTold(
  push: ReadyPushing,
  root: string,
  game: string,
  at: string,
  report: string[],
  noun: Noun = TURN
): Promise<undefined> {
  try {
    const why = await push(root, game, at, noun)
    report.push(why === null ? `pushed\t${game}` : `unpushed\t${why}`)
  } catch (thrown) {
    report.push(`unpushed\t${whyOf(thrown)}`)
  }
  return undefined
}
