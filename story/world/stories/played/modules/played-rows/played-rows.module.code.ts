import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { GameDisplayModules } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type {
  ClientStoryChapter,
  ClientStoryTurn,
} from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { composeSessionEnvelope } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"

export const PLAYED_CHAPTER_PAGE_TYPE_SLUG = "story-chapter-played"

export const PLAYED_TURN_PAGE_TYPE_SLUG = "story-turn-played"

export const PLAYED_CHAPTER_STORY_KEY = "story"

export const PLAYED_TURN_COLLECTIONS_KEY = "partOfCollections"

export const PLAYED_POSITION_KEY = "position"

export const PLAYED_ROWS_DRAWN = 20

const UNTITLED = "Untitled"

const PROSE_ALONE: GameDisplayModules = { chapterProse: {} }

export interface PlayedTail {
  readonly drawn: readonly Page[]
  readonly earlier: number
}

export interface PlayedEnvelopeInputs {
  readonly title: string
  readonly modules: GameDisplayModules
  readonly turns: readonly ClientStoryTurn[]
  readonly chapters: readonly ClientStoryChapter[]
  readonly state: GameState | null
}

function slugIn(row: Page): string | null {
  return typeof row.slug === "string" ? row.slug : null
}

export function playedTitleOf(row: Page): string {
  if (typeof row.title === "string" && row.title.trim() !== "") return row.title
  const position = asNumber(row.position)
  return position === null ? UNTITLED : `Turn ${position}`
}

function byPosition(one: Page, two: Page): number {
  const left = asNumber(one.position) ?? Number.POSITIVE_INFINITY
  const right = asNumber(two.position) ?? Number.POSITIVE_INFINITY
  if (left !== right) return left < right ? -1 : 1
  const leftName = slugIn(one) ?? one.id
  const rightName = slugIn(two) ?? two.id
  if (leftName === rightName) return 0
  return leftName < rightName ? -1 : 1
}

function playedOrder(rows: readonly Page[]): readonly Page[] {
  return [...rows].sort(byPosition)
}

export function playedTail(rows: readonly Page[]): PlayedTail {
  const ordered = playedOrder(rows)
  const earlier = Math.max(0, ordered.length - PLAYED_ROWS_DRAWN)
  return { drawn: ordered.slice(earlier), earlier }
}

function playedHref(pageTypeSlug: string, row: Page): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(pageTypeSlug),
    slug: slugIn(row),
    fallbackSlugSource: playedTitleOf(row),
    id: row.id,
  })
}

export function playedHrefsOf(
  pageTypeSlug: string,
  rows: readonly Page[]
): ReadonlyMap<string, string> {
  return new Map(rows.map((row) => [row.id, playedHref(pageTypeSlug, row)]))
}

export function playedTurnsOf(
  rows: readonly Page[],
  prose: ReadonlyMap<string, string>
): readonly ClientStoryTurn[] {
  return playedOrder(rows).map((row) => {
    const turnNumber = asNumber(row.position)
    return {
      id: row.id,
      title: playedTitleOf(row),
      text: prose.get(row.id) ?? "",
      ...(turnNumber === null ? {} : { turnNumber }),
    }
  })
}

export function playedChaptersOf(rows: readonly Page[]): readonly ClientStoryChapter[] {
  return playedOrder(rows).map((row) => {
    const chapterNumber = asNumber(row.position)
    return {
      id: row.id,
      title: playedTitleOf(row),
      href: playedHref(PLAYED_CHAPTER_PAGE_TYPE_SLUG, row),
      ...(chapterNumber === null ? {} : { chapterNumber }),
    }
  })
}

export function panelsDrawnHere(declared: GameDisplayModules | null): GameDisplayModules {
  if (declared === null) return PROSE_ALONE
  return {
    chapterProse: declared.chapterProse ?? {},
    ...(declared.beatLog === undefined ? {} : { beatLog: declared.beatLog }),
    ...(declared.hud === undefined ? {} : { hud: declared.hud }),
    ...(declared.quests === undefined ? {} : { quests: declared.quests }),
    ...(declared.sheet === undefined ? {} : { sheet: declared.sheet }),
    ...(declared.storySoFar === undefined ? {} : { storySoFar: declared.storySoFar }),
  }
}

export function playedEnvelope(inputs: PlayedEnvelopeInputs): SessionEnvelope {
  return composeSessionEnvelope(inputs.title, inputs.modules, {
    state: inputs.state,
    story: { chapters: [...inputs.chapters], current: [...inputs.turns] },
  })
}
