import { calendar, type calendar_v3 } from "@googleapis/calendar"
import { makeAuthClient, makeOAuthClient } from "./auth"
import { readDefaultCalendarId } from "./env"

export interface CalendarClient {
  readonly raw: calendar_v3.Calendar
  readonly defaultCalendarId: string | undefined
}

export async function makeCalendarClient(): Promise<CalendarClient> {
  const auth = makeAuthClient()
  const raw = calendar({ version: "v3", auth })
  return { raw, defaultCalendarId: readDefaultCalendarId() }
}

export async function makeOAuthCalendarClient(): Promise<CalendarClient> {
  const auth = makeOAuthClient()
  const raw = calendar({ version: "v3", auth })
  return { raw, defaultCalendarId: readDefaultCalendarId() }
}
