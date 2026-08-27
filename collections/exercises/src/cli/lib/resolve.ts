import { getEsoDayStr } from "@shared/recurrence/reset-times"
import { fieldStr } from "./fields"
import { getPage, getPages } from "../../pages/access"
import type { Page } from "../../pages/page"
import type { DayOfWeek } from "../../tracking/day-of-week"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const CANDIDATE_LIST_LIMIT = 5

async function resolveByRef(pageTypeSlug: string, ref: string, label: string): Promise<Page> {
  if (UUID_RE.test(ref)) {
    const byId = await getPage({ pageTypeSlug, where: [{ key: "id", eq: ref }] })
    if (byId == null) throw new Error(`${label} not found by id: ${ref}`)
    return byId
  }

  const bySlug = await getPage({ pageTypeSlug, where: [{ key: "slug", eq: ref }] })
  if (bySlug !== null) return bySlug

  const exact = await getPages({
    pageTypeSlug,
    where: [{ key: "title", eq: ref }],
    limit: 2,
  })
  if (exact.rows.length === 1 && exact.rows[0] !== undefined) return exact.rows[0]
  if (exact.rows.length > 1) {
    const ids = exact.rows.map((r) => r.id).join(", ")
    throw new Error(`${label} title "${ref}" matches more than one page (ids: ${ids}) — pass an id`)
  }

  const fuzzy = await getPages({
    pageTypeSlug,
    where: [{ key: "title", contains: ref }],
    limit: CANDIDATE_LIST_LIMIT + 1,
  })
  if (fuzzy.rows.length === 0) throw new Error(`${label} not found: "${ref}"`)
  if (fuzzy.rows.length === 1 && fuzzy.rows[0] !== undefined) return fuzzy.rows[0]
  const titles = fuzzy.rows
    .slice(0, CANDIDATE_LIST_LIMIT)
    .map((r) => `"${r.title ?? r.id}"`)
    .join(", ")
  const more = fuzzy.rows.length > CANDIDATE_LIST_LIMIT ? ", …" : ""
  throw new Error(`${label} "${ref}" is ambiguous — candidates: ${titles}${more}`)
}

export async function resolveExercise(ref: string): Promise<Page> {
  return resolveByRef("exercise", ref, "exercise")
}

export async function resolveOpenSession(ref?: string, now: Date = new Date()): Promise<Page> {
  if (ref !== undefined) return resolveByRef("workout-session", ref, "session")
  const open = await getPages({
    pageTypeSlug: "workout-session",
    where: [{ key: "completedAt", isNull: true }],
    order: [
      { by: "date", dir: "desc" },
      { by: "startedAt", dir: "desc" },
    ],
    limit: 1,
  })
  const session = open.rows[0]
  if (session === undefined) {
    throw new Error(
      "no open session — a session has to be started before anything records against it, or " +
        "pass --session to name one"
    )
  }
  const todayDayStr = getEsoDayStr(now)
  const sessionDayStr = fieldStr(session, "date")
  if (sessionDayStr !== todayDayStr) {
    throw new Error(
      `no open session for today (${todayDayStr}) — the most recent open session is ` +
        `"${session.title ?? session.id}" (${sessionDayStr ?? "no date"}), left open and not ` +
        "today's. Today's session has to be started (which closes abandoned ones), or target " +
        `that one explicitly with \`--session ${session.id}\`.`
    )
  }
  return session
}

export async function resolveActiveSchedule(): Promise<Page | null> {
  return getPage({
    pageTypeSlug: "workout-schedule",
    where: [{ key: "active", eq: true }],
  })
}

export async function resolveScheduleDay(
  scheduleSlug: string,
  dayOfWeek: DayOfWeek
): Promise<Page | null> {
  return getPage({
    pageTypeSlug: "schedule-day",
    where: [
      { key: "scheduleSlug", eq: scheduleSlug },
      { key: "dayOfWeek", eq: dayOfWeek },
    ],
  })
}
