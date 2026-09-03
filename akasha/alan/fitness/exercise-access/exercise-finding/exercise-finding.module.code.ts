import { getEsoDayStr } from "@akasha/day/eso-day"
import { type Row, rowFor, rowsFor, textIn } from "../exercise-rows/exercise-rows.module.code.ts"

export type Found = { readonly row: Row } | { readonly refused: string }

export type Standing = { readonly row: Row | null } | { readonly refused: string }

const EXERCISE = "exercise"

const WORKOUT_SESSION = "workout-session"

const WORKOUT_SCHEDULE = "workout-schedule"

const SCHEDULE_DAY = "schedule-day"

const UUID_SAID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const NAMED_AT_MOST = 5

const TWO = 2

async function foundBy(pageTypeSlug: string, ref: string, named: string): Promise<Found> {
  if (UUID_SAID.test(ref)) {
    const byId = await rowsFor({ pageTypeSlug, where: [{ key: "id", eq: ref }], limit: 1 })
    if ("unread" in byId) return { refused: byId.unread }
    const one = byId.rows[0]
    if (one === undefined) return { refused: `no ${named} carries the id ${ref}` }
    return { row: one }
  }

  const bySlug = await rowsFor({ pageTypeSlug, where: [{ key: "slug", eq: ref }], limit: 1 })
  if ("unread" in bySlug) return { refused: bySlug.unread }
  const slugged = bySlug.rows[0]
  if (slugged !== undefined) return { row: slugged }

  const byTitle = await rowsFor({
    pageTypeSlug,
    where: [{ key: "title", eq: ref }],
    limit: TWO,
  })
  if ("unread" in byTitle) return { refused: byTitle.unread }
  const titled = byTitle.rows[0]
  if (byTitle.rows.length === 1 && titled !== undefined) return { row: titled }
  if (byTitle.rows.length > 1) {
    const ids = byTitle.rows.map((one) => one.id).join(", ")
    return {
      refused: `the ${named} title "${ref}" is carried by more than one page (${ids}), so name an id`,
    }
  }

  const byPart = await rowsFor({
    pageTypeSlug,
    where: [{ key: "title", contains: ref }],
    limit: NAMED_AT_MOST + 1,
  })
  if ("unread" in byPart) return { refused: byPart.unread }
  if (byPart.rows.length === 0) return { refused: `no ${named} is filed at "${ref}"` }
  const only = byPart.rows[0]
  if (byPart.rows.length === 1 && only !== undefined) return { row: only }
  const titles = byPart.rows
    .slice(0, NAMED_AT_MOST)
    .map((one) => `"${one.title ?? one.id}"`)
    .join(", ")
  const more = byPart.rows.length > NAMED_AT_MOST ? ", and more" : ""
  return { refused: `the ${named} "${ref}" is unsettled — it could be ${titles}${more}` }
}

export async function exerciseNamed(ref: string): Promise<Found> {
  return foundBy(EXERCISE, ref, EXERCISE)
}

export async function sessionNamed(ref: string): Promise<Found> {
  return foundBy(WORKOUT_SESSION, ref, "session")
}

export async function openSession(ref: string | undefined, now: Date): Promise<Found> {
  if (ref !== undefined) return sessionNamed(ref)
  const open = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "workoutSessionCompletedAt", empty: true }],
    order: [{ by: "workoutSessionDate", dir: "desc" }],
    limit: 1,
  })
  if ("unread" in open) return { refused: open.unread }
  const session = open.rows[0]
  if (session === undefined) {
    return {
      refused:
        "no session is open, and a session is what a set is recorded against — start one, or name one at `--session`",
    }
  }
  const today = getEsoDayStr(now)
  const stood = textIn(session, "workoutSessionDate")
  if (stood !== today) {
    return {
      refused:
        `the open session is "${session.title ?? session.id}" of ${stood ?? "no day"} rather than of today (${today}), ` +
        `so start today's session, which closes the one left open, or name that one at \`--session ${session.id}\``,
    }
  }
  return { row: session }
}

export async function activeSchedule(): Promise<Standing> {
  const found = await rowFor({
    pageTypeSlug: WORKOUT_SCHEDULE,
    where: [{ key: "workoutScheduleActive", eq: true }],
  })
  if ("unread" in found) return { refused: found.unread }
  return { row: found.row }
}

export async function scheduleDayFor(scheduleSlug: string, dayOfWeek: string): Promise<Standing> {
  const found = await rowFor({
    pageTypeSlug: SCHEDULE_DAY,
    where: [
      { key: "scheduleSlug", eq: scheduleSlug },
      { key: "dayOfWeek", eq: dayOfWeek },
    ],
  })
  if ("unread" in found) return { refused: found.unread }
  return { row: found.row }
}
