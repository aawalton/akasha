import { calendar, type calendar_v3 } from "@googleapis/calendar"
import { makeAuthClient, makeOAuthClient } from "../calendar-auth/calendar-auth.module.code.ts"
import { readDefaultCalendarId } from "../calendar-credentials/calendar-credentials.module.code.ts"

export interface CalendarClient {
  readonly raw: calendar_v3.Calendar
  readonly defaultCalendarId: string | undefined
}

export async function makeCalendarClient(): Promise<CalendarClient> {
  const authorised = makeAuthClient()
  const raw = calendar({ version: "v3", auth: authorised })
  return { raw, defaultCalendarId: readDefaultCalendarId() }
}

export async function makeOAuthCalendarClient(): Promise<CalendarClient> {
  const authorised = makeOAuthClient()
  const raw = calendar({ version: "v3", auth: authorised })
  return { raw, defaultCalendarId: readDefaultCalendarId() }
}
