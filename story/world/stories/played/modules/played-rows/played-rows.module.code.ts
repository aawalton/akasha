import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { NamedPages } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import type { StoryDisplayModules } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type {
  ClientStoryChapter,
  ClientStoryTurn,
} from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { composeSessionEnvelope } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import {
  PLAYER,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export const PLAYED_CHAPTER_PAGE_TYPE_SLUG = "story-chapter-played"

export const PLAYED_TURN_PAGE_TYPE_SLUG = "story-turn-played"

export const PLAYED_CHAPTER_STORY_KEY = "story"

export const PLAYED_TURN_COLLECTIONS_KEY = "partOfCollections"

export const PLAYED_POSITION_KEY = "position"

export const PLAYED_CHARACTER_PAGE_TYPE_SLUG = "character-player"

const PLAYED_CHARACTER_STORY_KEY = "story"

export type PlayedList = { readonly pageTypeSlug: string; readonly named: NamedPages }

export type PlayedLists = {
  readonly chapters: PlayedList
  readonly turns: PlayedList
  readonly character: PlayedList
}

function storyOnly(pageTypeSlug: string, key: string, storyAddress: string): PlayedList {
  return { pageTypeSlug, named: { by: "where", key, values: [storyAddress] } }
}

export function playedListsOf(storyAddress: string): PlayedLists {
  return {
    chapters: storyOnly(PLAYED_CHAPTER_PAGE_TYPE_SLUG, PLAYED_CHAPTER_STORY_KEY, storyAddress),
    turns: storyOnly(PLAYED_TURN_PAGE_TYPE_SLUG, PLAYED_TURN_COLLECTIONS_KEY, storyAddress),
    character: storyOnly(PLAYED_CHARACTER_PAGE_TYPE_SLUG, PLAYED_CHARACTER_STORY_KEY, storyAddress),
  }
}

const PLAYED_TURN_STATUS_KEY = "turnStatus"

const PLAYED_TURN_ACTION_KEY = "action"

export const PLAYED_ROWS_DRAWN = 20

const UNTITLED = "Untitled"

const PLAYED_SECTIONS: StoryDisplayModules = {
  chapterProse: {},
  hud: {},
  quests: {},
  sheet: {},
  storySoFar: { source: "turns" },
}

interface PlayedTail {
  readonly drawn: readonly Page[]
  readonly earlier: number
}

interface PlayedEnvelopeInputs {
  readonly title: string
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

export type Making = {
  readonly slug: string
  readonly action: string
  readonly step: TurnStep
}

function stepOf(row: Page): TurnStep {
  return stepIn(row[PLAYED_TURN_STATUS_KEY]) ?? PLAYER
}

export function playedReady(rows: readonly Page[]): readonly Page[] {
  return rows.filter((row) => stepOf(row) === PLAYER)
}

export function playedMaking(rows: readonly Page[]): Making | null {
  const last = playedOrder(rows).at(-1)
  if (last === undefined) return null
  const step = stepOf(last)
  if (step === PLAYER) return null
  const action = last[PLAYED_TURN_ACTION_KEY]
  return { slug: slugIn(last) ?? last.id, action: typeof action === "string" ? action : "", step }
}

const PLAYED_TURN_ENDS_AT_KEY = "endsAt"

const PLAYED_CLOCK = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

export function playedClockOf(ready: readonly Page[]): string | null {
  const ends = playedOrder(ready).at(-1)?.[PLAYED_TURN_ENDS_AT_KEY]
  if (typeof ends !== "string") return null
  const at = new Date(ends)
  if (Number.isNaN(at.getTime())) return null
  const part = new Map(PLAYED_CLOCK.formatToParts(at).map((one) => [one.type, one.value]))
  const day = `${part.get("weekday")}, ${part.get("month")} ${part.get("day")}`
  return `${day} · ${part.get("hour")}:${part.get("minute")} ${part.get("dayPeriod")}`
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

export function playedEnvelope(inputs: PlayedEnvelopeInputs): SessionEnvelope {
  return composeSessionEnvelope(inputs.title, PLAYED_SECTIONS, {
    state: inputs.state,
    story: { chapters: [...inputs.chapters], current: [...inputs.turns] },
  })
}
