import { type Row, rowsFor, textIn, titleOf } from "../exercise-rows/exercise-rows.module.code.ts"

const WORKOUT_SESSION = "workout-session"

const OPEN_AT_MOST = 50

export interface Abandoned {
  readonly lastSetAt: string | null
  readonly startedAt: string | null
}

export interface Closing {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly date: string | null
  readonly completedAt: string
}

export type Abandonments = { readonly closings: readonly Closing[] } | { readonly refused: string }

export function closedAtFor(session: Abandoned): string | null {
  return session.lastSetAt ?? session.startedAt ?? null
}

export function leftOpen(sessions: readonly Row[], todayDayStr: string): readonly Row[] {
  return sessions.filter((row) => {
    const date = textIn(row, "workoutSessionDate")
    return date !== undefined && date < todayDayStr
  })
}

export function closingFor(row: Row): Closing | null {
  const completedAt = closedAtFor({
    lastSetAt: null,
    startedAt: textIn(row, "workoutSessionStartedAt") ?? null,
  })
  if (completedAt === null || row.slug === null) return null
  return {
    id: row.id,
    slug: row.slug,
    title: titleOf(row),
    date: textIn(row, "workoutSessionDate") ?? null,
    completedAt,
  }
}

export function closingsIn(sessions: readonly Row[], todayDayStr: string): readonly Closing[] {
  const found: Closing[] = []
  for (const row of leftOpen(sessions, todayDayStr)) {
    const closing = closingFor(row)
    if (closing !== null) found.push(closing)
  }
  return found
}

export async function abandonedSessions(todayDayStr: string): Promise<Abandonments> {
  const open = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "workoutSessionCompletedAt", empty: true }],
    order: [{ by: "workoutSessionDate", dir: "desc" }],
    select: ["id", "seq", "slug", "title", "workoutSessionDate", "workoutSessionStartedAt"],
    limit: OPEN_AT_MOST,
  })
  if ("unread" in open) return { refused: open.unread }
  return { closings: closingsIn(open.rows, todayDayStr) }
}
