import { InputError } from "@akasha/errors-core/exit-code"
import * as z from "zod"
import type {
  EventInput,
  EventPatch,
  ListEventsQuery,
  NormalizedEvent,
  RsvpStatus,
} from "../calendar-event-shapes/calendar-event-shapes.module.code.ts"

const googleEventTimeSchema = z
  .object({
    dateTime: z.string().optional(),
    date: z.string().optional(),
    timeZone: z.string().optional(),
  })
  .passthrough()

export const googleEventSchema = z
  .object({
    id: z.string(),
    status: z.string().optional(),
    summary: z.string().optional(),
    htmlLink: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    start: googleEventTimeSchema.optional(),
    end: googleEventTimeSchema.optional(),
    recurrence: z.array(z.string()).optional(),
  })
  .passthrough()

export const googleEventsListSchema = z
  .object({
    items: z.array(googleEventSchema).optional(),
  })
  .passthrough()

export const googleRsvpEventSchema = z
  .object({
    id: z.string(),
    attendees: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .passthrough()

export function normalizeEvent(raw: unknown, calendarId: string): NormalizedEvent {
  const event = googleEventSchema.parse(raw)
  return {
    id: event.id,
    calendarId,
    summary: event.summary,
    start: event.start?.dateTime ?? event.start?.date,
    end: event.end?.dateTime ?? event.end?.date,
    htmlLink: event.htmlLink,
    status: event.status,
    recurrence: event.recurrence,
  }
}

export function normalizeRecurrence(rules: readonly string[]): readonly string[] {
  return rules.map((rule) => `RRULE:${rule.trim().replace(/^RRULE:/i, "")}`)
}

export function computeRsvpAttendees(
  attendees: readonly Record<string, unknown>[],
  status: RsvpStatus
): { readonly attendees: readonly Record<string, unknown>[]; readonly matched: boolean } {
  let matched = false
  const next = attendees.map((attendee) => {
    if (attendee.self === true) {
      matched = true
      return { ...attendee, responseStatus: status }
    }
    return { ...attendee }
  })
  return { attendees: next, matched }
}

export function isDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function validateBoundaries(
  start: string | undefined,
  end: string | undefined,
  timezone: string | undefined
): undefined {
  const startAllDay = start !== undefined && isDateOnly(start)
  const endAllDay = end !== undefined && isDateOnly(end)
  if (start !== undefined && end !== undefined && startAllDay !== endAllDay)
    throw new InputError(
      "mixed all-day and timed boundaries: --start and --end must both be date-only " +
        "(YYYY-MM-DD) for an all-day event or both include a time"
    )
  if ((startAllDay || endAllDay) && timezone !== undefined)
    throw new InputError("--timezone is not valid for an all-day (date-only) event; remove it")
}

function buildEventTime(value: string, timezone: string | undefined): Record<string, unknown> {
  if (isDateOnly(value)) return { date: value }
  return timezone !== undefined ? { dateTime: value, timeZone: timezone } : { dateTime: value }
}

export function buildEventRequestBody(input: EventInput): Record<string, unknown> {
  validateBoundaries(input.start, input.end, input.timezone)
  const body: Record<string, unknown> = {
    summary: input.summary,
    start: buildEventTime(input.start, input.timezone),
    end: buildEventTime(input.end, input.timezone),
  }
  if (input.description !== undefined) body.description = input.description
  if (input.location !== undefined) body.location = input.location
  if (input.attendees !== undefined) body.attendees = input.attendees.map((email) => ({ email }))
  if (input.recurrence !== undefined) body.recurrence = normalizeRecurrence(input.recurrence)
  return body
}

export function buildPatchRequestBody(patch: EventPatch): Record<string, unknown> {
  validateBoundaries(patch.start, patch.end, patch.timezone)
  const body: Record<string, unknown> = {}
  if (patch.summary !== undefined) body.summary = patch.summary
  if (patch.start !== undefined) body.start = buildEventTime(patch.start, patch.timezone)
  if (patch.end !== undefined) body.end = buildEventTime(patch.end, patch.timezone)
  if (patch.description !== undefined) body.description = patch.description
  if (patch.location !== undefined) body.location = patch.location
  if (patch.attendees !== undefined) body.attendees = patch.attendees.map((email) => ({ email }))
  if (patch.recurrence !== undefined) body.recurrence = normalizeRecurrence(patch.recurrence)
  return body
}

export function buildListParams(
  query: ListEventsQuery,
  calendarId: string
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    calendarId,
    singleEvents: true,
    orderBy: "startTime",
  }
  if (query.from !== undefined) params.timeMin = query.from
  if (query.to !== undefined) params.timeMax = query.to
  if (query.query !== undefined) params.q = query.query
  if (query.max !== undefined) params.maxResults = query.max
  return params
}
