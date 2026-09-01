import { DataError } from "@shared/errors-core/exit"
import { askComposed } from "@shared/pages-query/ask"
import { fieldStr } from "../cli/lib/fields"
import { pageOfRow, patchPage } from "../pages/access"
import type { Page } from "../pages/page"

const WORKOUT_SESSION_PAGE_TYPE_SLUG = "workout-session"

export interface AbandonedSession {
  readonly lastSetAt: string | null
  readonly startedAt: string | null
}

export function completedAtForAbandoned(session: AbandonedSession): string | null {
  return session.lastSetAt ?? session.startedAt ?? null
}

const OPEN_SESSION_LIMIT = 50

export interface ClosedSession {
  readonly id: string
  readonly title: string
  readonly date: string | null
  readonly completedAt: string
}

export async function findAbandonedSessions(todayDayStr: string): Promise<readonly Page[]> {
  const asked = await askComposed({
    "page-type": "workout-session",
    where: { "completed-at": { empty: true } },
    "sort-by": "date",
    descending: true,
    keys: ["id", "seq", "slug", "title", "date", "started-at"],
    limit: OPEN_SESSION_LIMIT,
  })
  if (!asked.ok) throw new Error(`findAbandonedSessions: ${asked.why}`)
  const open = asked.answer.rows.map((row) => pageOfRow(row.values))
  return open.filter((row) => {
    const date = fieldStr(row, "date")
    return date !== undefined && date < todayDayStr
  })
}

export async function closeAbandonedSessions(
  todayDayStr: string
): Promise<readonly ClosedSession[]> {
  const abandoned = await findAbandonedSessions(todayDayStr)
  if (abandoned.length === 0) return []

  const closed: ClosedSession[] = []
  for (const row of abandoned) {
    const completedAt = completedAtForAbandoned({
      lastSetAt: null,
      startedAt: fieldStr(row, "startedAt") ?? null,
    })
    if (completedAt === null || row.slug === null) continue
    try {
      await patchPage(WORKOUT_SESSION_PAGE_TYPE_SLUG, row.slug, { completedAt })
    } catch (cause) {
      throw new DataError(
        `${WORKOUT_SESSION_PAGE_TYPE_SLUG} ${row.slug} was not closed: ${cause instanceof Error ? cause.message : String(cause)}`
      )
    }
    closed.push({
      id: row.id,
      title: row.title ?? row.id,
      date: fieldStr(row, "date") ?? null,
      completedAt,
    })
  }
  return closed
}
