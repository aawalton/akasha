import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { GameDisplayModules } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { latestFrontierMs } from "akasha/story/ui/modules/revealed-frontier/revealed-frontier.module.code.ts"
import { composeSessionEnvelope } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import type { ProseRow } from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"

export const CHAPTER_PAGE_TYPE_SLUG = "story-chapter-read"

export const CHAPTER_STORY_KEY = "story"

export const CHAPTER_POSITION_KEY = "position"

export const ROWS_BEFORE_FRONTIER = 20

export const ROWS_AFTER_FRONTIER = 40

const UNTITLED = "Untitled"

const PUBLISHED_AT_KEY = "publishedAt"

const PUBLISHED_DAY_KEY = "publishedDay"

const CHANNEL_MODULES: GameDisplayModules = {
  chapterProse: { titles: "shown", pastTurns: "muted" },
}

export interface ChannelSpan {
  readonly from: number
  readonly to: number
}

function numberIn(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string" || value.trim() === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function titleIn(value: unknown): string {
  return typeof value === "string" && value.trim() !== "" ? value : UNTITLED
}

function byPosition(a: Page, b: Page): number {
  const left = numberIn(a.position) ?? Number.POSITIVE_INFINITY
  const right = numberIn(b.position) ?? Number.POSITIVE_INFINITY
  if (left !== right) return left < right ? -1 : 1
  const leftTitle = titleIn(a.title)
  const rightTitle = titleIn(b.title)
  if (leftTitle === rightTitle) return 0
  return leftTitle < rightTitle ? -1 : 1
}

function chapterHref(row: Page): string {
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(CHAPTER_PAGE_TYPE_SLUG),
    slug: typeof row.slug === "string" ? row.slug : null,
    fallbackSlugSource: titleIn(row.title),
    id: row.id,
  })
}

export function chapterTurnsOf(rows: readonly Page[]): readonly ClientStoryTurn[] {
  return [...rows].sort(byPosition).map((row) => {
    const turnNumber = numberIn(row.position)
    return {
      id: row.id,
      title: titleIn(row.title),
      text: "",
      ...(turnNumber === undefined ? {} : { turnNumber }),
      fullyRead: row.completedAt != null,
    }
  })
}

export function chapterHrefsOf(rows: readonly Page[]): ReadonlyMap<string, string> {
  return new Map(rows.map((row) => [row.id, chapterHref(row)]))
}

export function chapterChannelEnvelope(
  title: string,
  turns: readonly ClientStoryTurn[]
): SessionEnvelope {
  return composeSessionEnvelope(title, CHANNEL_MODULES, {
    state: null,
    story: { chapters: [], current: turns },
  })
}

export function newestChapterAtMs(rows: readonly Page[]): number | null {
  const instants = rows.map((row) => ({
    [PUBLISHED_AT_KEY]: row.publishedAt,
    [PUBLISHED_DAY_KEY]: row.publishedDay,
  }))
  return latestFrontierMs(instants, PUBLISHED_AT_KEY, PUBLISHED_DAY_KEY)
}

export function readChapterCount(rows: readonly ProseRow[]): number {
  return rows.reduce((count, row) => (row.turn.fullyRead === true ? count + 1 : count), 0)
}

export function frontierRowIndex(rows: readonly ProseRow[]): number {
  const unread = rows.findIndex((row) => row.turn.fullyRead !== true)
  if (unread !== -1) return unread
  return rows.length === 0 ? 0 : rows.length - 1
}

export function channelSpan(rows: readonly ProseRow[]): ChannelSpan {
  if (rows.length === 0) return { from: 0, to: 0 }
  const frontier = frontierRowIndex(rows)
  return {
    from: Math.max(0, frontier - ROWS_BEFORE_FRONTIER),
    to: Math.min(rows.length, frontier + ROWS_AFTER_FRONTIER + 1),
  }
}
