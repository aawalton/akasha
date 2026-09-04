import { inputError, operationalError } from "@akasha/errors-core/exit-code"
import type { Page } from "../day-narrow-types/day-narrow-types.module.code.ts"
import {
  dayByDate,
  dayById,
  landDayPage,
  openSession,
  sessionsBefore,
  sessionsOfDay,
} from "../day-place/day-place.module.code.ts"
import { displayTitle, fieldStr } from "../tracking-format/tracking-format.module.code.ts"
// A type and nothing else. Every read below is asked of the funnel, so this file no longer takes
// anything off `./pages.ts` that reaches the page store, and a caller of it is not reaching one
// either — which is what `lib/inbox-tracking/persist.ts` and `./sessions.ts` were counted for while
// this module still held a client of its own.
import type { PageAccessClient } from "../tracking-pages/tracking-pages.module.code.ts"

const PRIOR_SCAN_LIMIT = 5

export const TRACKING_WRITER = "ops-tracking"

export const DAILY_TRACKING_VERSION = "3.0"

export async function findOpenSession(_sb: PageAccessClient): Promise<Page | null> {
  return openSession()
}

export async function requireOpenSession(sb: PageAccessClient): Promise<Page> {
  const session = await findOpenSession(sb)
  if (session === null) {
    throw inputError('no open session — start one with `ops tracking start "<title>"`')
  }
  return session
}

export async function ensureNoOpenSession(sb: PageAccessClient): Promise<void> {
  const session = await findOpenSession(sb)
  if (session !== null) {
    throw inputError(
      `a session is already open: "${displayTitle(session)}" — ` +
        "close it with `ops tracking close`, or transition with `ops tracking switch`"
    )
  }
}

export async function findPriorClosedSession(
  _sb: PageAccessClient,
  beforeInstant: Date
): Promise<Page | null> {
  for (const row of await sessionsBefore(beforeInstant, PRIOR_SCAN_LIMIT)) {
    if (fieldStr(row, "endTime") !== undefined) return row
  }
  return null
}

export async function blockDay(
  _sb: PageAccessClient,
  session: Page | null
): Promise<string | undefined> {
  if (session === null) return undefined
  const dailyId = fieldStr(session, "dailyTracking")
  if (dailyId === undefined) return undefined
  const day = await dayById(dailyId)
  if (day === null) return undefined
  return fieldStr(day, "date")
}

export async function resolveOrCreateDaily(
  _sb: PageAccessClient,
  dayStr: string
): Promise<{ readonly id: string; readonly created: boolean }> {
  const held = await dayByDate(dayStr)
  if (held !== null && held.id !== "") return { id: held.id, created: false }

  const id = Bun.randomUUIDv7()
  const landed = await landDayPage(
    "patch",
    dayStr,
    { id, title: `@date:${dayStr}`, date: dayStr, version: DAILY_TRACKING_VERSION },
    TRACKING_WRITER
  )
  if (!landed.ok) {
    throw operationalError(`the day ${dayStr} did not land as a file: ${landed.why}`)
  }
  return { id, created: true }
}

export async function listDaySessions(
  _sb: PageAccessClient,
  dailyId: string
): Promise<readonly Page[]> {
  return sessionsOfDay(dailyId)
}
