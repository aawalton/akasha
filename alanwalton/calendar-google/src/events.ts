import { InputError } from "@shared/errors-core/exit"
import type { CalendarClient } from "./client"
import { OWNER_CALENDAR_ID } from "./env"
import {
  buildEventRequestBody,
  buildListParams,
  buildPatchRequestBody,
  computeRsvpAttendees,
  googleEventsListSchema,
  googleRsvpEventSchema,
  normalizeEvent,
} from "./schema"
import type {
  EventInput,
  EventPatch,
  EventRef,
  ListEventsQuery,
  NormalizedEvent,
  RsvpInput,
} from "./types"

export function resolveCalendarId(
  explicit: string | undefined,
  defaultCalendarId: string | undefined
): string {
  if (explicit === "primary") return OWNER_CALENDAR_ID
  return explicit ?? defaultCalendarId ?? OWNER_CALENDAR_ID
}

export async function createEvent(
  client: CalendarClient,
  input: EventInput
): Promise<NormalizedEvent> {
  const calendarId = resolveCalendarId(input.calendarId, client.defaultCalendarId)
  const res = await client.raw.events.insert({
    calendarId,
    sendUpdates: input.sendUpdates ?? "all",
    requestBody: buildEventRequestBody(input),
  })
  return normalizeEvent(res.data, calendarId)
}

export async function getEvent(client: CalendarClient, ref: EventRef): Promise<NormalizedEvent> {
  const calendarId = resolveCalendarId(ref.calendarId, client.defaultCalendarId)
  const res = await client.raw.events.get({ calendarId, eventId: ref.eventId })
  return normalizeEvent(res.data, calendarId)
}

export async function listEvents(
  client: CalendarClient,
  query: ListEventsQuery
): Promise<readonly NormalizedEvent[]> {
  const calendarId = resolveCalendarId(query.calendarId, client.defaultCalendarId)
  const res = await client.raw.events.list(buildListParams(query, calendarId))
  const parsed = googleEventsListSchema.parse(res.data)
  return (parsed.items ?? []).map((item) => normalizeEvent(item, calendarId))
}

export async function updateEvent(
  client: CalendarClient,
  patch: EventPatch
): Promise<NormalizedEvent> {
  const calendarId = resolveCalendarId(patch.calendarId, client.defaultCalendarId)
  const res = await client.raw.events.patch({
    calendarId,
    eventId: patch.eventId,
    sendUpdates: patch.sendUpdates ?? "all",
    requestBody: buildPatchRequestBody(patch),
  })
  return normalizeEvent(res.data, calendarId)
}

export async function deleteEvent(
  client: CalendarClient,
  ref: EventRef
): Promise<{ readonly deleted: true; readonly eventId: string }> {
  const calendarId = resolveCalendarId(ref.calendarId, client.defaultCalendarId)
  await client.raw.events.delete({ calendarId, eventId: ref.eventId })
  return { deleted: true, eventId: ref.eventId }
}

export async function rsvpEvent(
  client: CalendarClient,
  input: RsvpInput
): Promise<NormalizedEvent> {
  const calendarId = resolveCalendarId(input.calendarId, client.defaultCalendarId)
  const current = await client.raw.events.get({ calendarId, eventId: input.eventId })
  const parsed = googleRsvpEventSchema.parse(current.data)
  const { attendees, matched } = computeRsvpAttendees(parsed.attendees ?? [], input.status)
  if (!matched)
    throw new InputError(
      `cannot RSVP to event ${input.eventId}: you are not an attendee on it ` +
        "(no attendee is marked as self), so there is no response of yours to set"
    )
  const res = await client.raw.events.patch({
    calendarId,
    eventId: input.eventId,
    sendUpdates: input.sendUpdates ?? "all",
    requestBody: { attendees: [...attendees] },
  })
  return normalizeEvent(res.data, calendarId)
}
