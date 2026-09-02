import { buildPageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { ChapterProseHistory } from "@akasha/story-engine-core/game-schema"
import { isPublishedTurnStatus, TurnStatusSchema } from "@akasha/story-engine-core/turn-schema"
import { z } from "zod"
import type {
  ClientStoryChapter,
  ClientStoryTurn,
} from "../client-story-session/client-story-session.module.code.ts"

const TURN_PAGE_TYPE_SLUG = toPageTypeSlug("game-turn")

export const PUBLISHED_TURN_STATUSES = TurnStatusSchema.options.filter((s) =>
  isPublishedTurnStatus(s)
)

const SnapshotRecordSchema = z.record(z.string(), z.unknown())

function statusOf(row: Record<string, unknown>): string | undefined {
  return typeof row.status === "string" ? row.status : undefined
}

function isTurnFullyRead(row: Record<string, unknown>): boolean {
  return row.completedAt != null
}

function readerLink(
  row: Record<string, unknown>,
  id: string,
  readerBaseUrl: string | null
): string {
  const title = typeof row.title === "string" ? row.title : "Untitled"
  const slug = typeof row.slug === "string" ? row.slug : null
  const param = buildPageHrefParam({
    pageTypeSlug: TURN_PAGE_TYPE_SLUG,
    slug,
    fallbackSlugSource: title,
    id,
  })
  return `${readerBaseUrl ?? ""}/game-turn/${param}`
}

interface ConsideredRow {
  readonly row: Record<string, unknown>
  readonly id: string
  readonly session: number
}

export function composeStorySession(input: {
  rows: readonly Record<string, unknown>[]
  currentSession: number
  readerBaseUrl: string | null
  history?: ChapterProseHistory
}): { chapters: readonly ClientStoryChapter[]; current: readonly ClientStoryTurn[] } {
  const { rows, currentSession, readerBaseUrl } = input
  const history = input.history ?? "session"

  const considered: ConsideredRow[] = []
  for (const row of rows) {
    if (typeof row.id !== "string") continue
    if (!isPublishedTurnStatus(statusOf(row))) continue
    const session = typeof row.sessionNumber === "number" ? row.sessionNumber : currentSession
    considered.push({ row, id: row.id, session })
  }

  const frontier =
    history === "full" ? considered : considered.filter((c) => c.session === currentSession)
  const current: ClientStoryTurn[] = frontier.map((c) => ({
    id: c.id,
    title: typeof c.row.title === "string" ? c.row.title : "Untitled",
    text: typeof c.row.text === "string" ? c.row.text : "",
    ...(typeof c.row.turnNumber === "number" ? { turnNumber: c.row.turnNumber } : {}),
    ...(history === "full" ? { sessionNumber: c.session } : {}),
    ...(isTurnFullyRead(c.row) ? { fullyRead: true } : {}),
  }))

  const firstBySession = new Map<number, ConsideredRow>()
  for (const c of considered) {
    if (c.session >= currentSession) continue
    if (!firstBySession.has(c.session)) firstBySession.set(c.session, c)
  }

  const chapters: ClientStoryChapter[] = [...firstBySession.keys()]
    .sort((a, b) => a - b)
    .map((session) => {
      const first = firstBySession.get(session)
      if (first === undefined) throw new Error("unreachable: session key without its row")
      return {
        id: first.id,
        title: `Session ${session}`,
        href: readerLink(first.row, first.id, readerBaseUrl),
        chapterNumber: session,
      }
    })

  return { chapters, current }
}

export function pickLatestPublishedSnapshot(
  rows: readonly Record<string, unknown>[]
): Record<string, unknown> | null {
  let latest: Record<string, unknown> | undefined
  for (const row of rows) {
    if (!isPublishedTurnStatus(statusOf(row))) continue
    latest = row
  }
  if (latest === undefined) return null
  const snapshot = latest.sheetSnapshot
  if (Array.isArray(snapshot)) return null
  const parsed = SnapshotRecordSchema.safeParse(snapshot)
  return parsed.success ? parsed.data : null
}
