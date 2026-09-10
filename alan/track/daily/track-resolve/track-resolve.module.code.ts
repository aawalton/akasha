import {
  inputError,
  operationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Page, PageAccessClient } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { landDayPage } from "../day-place/day-place.module.code.ts"
import { dayByDate, dayById } from "../day-reading/day-reading.module.code.ts"
import {
  openSession,
  sessionsBefore,
  sessionsOfDay,
} from "../day-stretches/day-stretches.module.code.ts"
import { displayTitle, fieldStr } from "../track-format/track-format.module.code.ts"

const PRIOR_SCAN_LIMIT = 5

export const TRACKING_WRITER = "tracking"

export const DAILY_TRACKING_VERSION = "3.0"

export async function findOpenSession(_sb: PageAccessClient): Promise<Page | null> {
  return openSession()
}

export async function requireOpenSession(sb: PageAccessClient): Promise<Page> {
  const session = await findOpenSession(sb)
  if (session === null) {
    throw inputError(
      'no open session — open one with `akasha track session open --title "<title>"`'
    )
  }
  return session
}

export async function ensureNoOpenSession(sb: PageAccessClient): Promise<void> {
  const session = await findOpenSession(sb)
  if (session !== null) {
    throw inputError(
      `a session is already open: "${displayTitle(session)}" — ` +
        "close it with `akasha track session close`, or move on with `akasha track session switch`"
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
