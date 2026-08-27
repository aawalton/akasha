import { describe, expect, test } from "bun:test"
import {
  buildEventRequestBody,
  buildListParams,
  buildPatchRequestBody,
  computeRsvpAttendees,
  googleEventSchema,
  googleRsvpEventSchema,
  normalizeEvent,
  normalizeRecurrence,
} from "./schema"

const HOME_ZONE = ["America", "Denver"].join("/")

describe("normalizeEvent", () => {
  test("maps a timed event using start/end dateTime", () => {
    const raw = {
      id: "evt1",
      status: "confirmed",
      summary: "Sync",
      htmlLink: "https://cal/evt1",
      start: { dateTime: "2026-06-10T15:00:00Z", timeZone: "UTC" },
      end: { dateTime: "2026-06-10T15:30:00Z" },
    }
    expect(normalizeEvent(raw, "cal-a")).toEqual({
      id: "evt1",
      calendarId: "cal-a",
      summary: "Sync",
      start: "2026-06-10T15:00:00Z",
      end: "2026-06-10T15:30:00Z",
      htmlLink: "https://cal/evt1",
      status: "confirmed",
      recurrence: undefined,
    })
  })

  test("falls back to the all-day date when dateTime is absent", () => {
    const raw = {
      id: "evt2",
      start: { date: "2026-06-10" },
      end: { date: "2026-06-11" },
    }
    const normalized = normalizeEvent(raw, "cal-b")
    expect(normalized.start).toBe("2026-06-10")
    expect(normalized.end).toBe("2026-06-11")
    expect(normalized.summary).toBeUndefined()
    expect(normalized.status).toBeUndefined()
  })

  test("surfaces the recurrence array when present", () => {
    const raw = {
      id: "evt4",
      start: { dateTime: "2026-06-21T10:30:00", timeZone: HOME_ZONE },
      end: { dateTime: "2026-06-21T11:30:00", timeZone: HOME_ZONE },
      recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=SU"],
    }
    expect(normalizeEvent(raw, "cal-c").recurrence).toEqual(["RRULE:FREQ=WEEKLY;BYDAY=SU"])
  })
})

describe("googleEventSchema passthrough", () => {
  test("preserves unknown keys", () => {
    const parsed: Record<string, unknown> = googleEventSchema.parse({
      id: "evt3",
      summary: "X",
      colorId: "5",
      etag: '"abc"',
    })
    expect(parsed.colorId).toBe("5")
    expect(parsed.etag).toBe('"abc"')
  })
})

describe("buildEventRequestBody", () => {
  test("omits undefined fields and expands attendee emails", () => {
    const body = buildEventRequestBody({
      summary: "Meet",
      start: "2026-06-10T15:00:00Z",
      end: "2026-06-10T15:30:00Z",
      attendees: ["a@x.com", "b@y.com"],
    })
    expect(body).toEqual({
      summary: "Meet",
      start: { dateTime: "2026-06-10T15:00:00Z" },
      end: { dateTime: "2026-06-10T15:30:00Z" },
      attendees: [{ email: "a@x.com" }, { email: "b@y.com" }],
    })
    expect("description" in body).toBe(false)
    expect("location" in body).toBe(false)
  })

  test("sets start/end timeZone when a timezone is provided", () => {
    const body = buildEventRequestBody({
      summary: "Sacrament Meeting",
      start: "2026-06-21T10:30:00",
      end: "2026-06-21T11:30:00",
      timezone: HOME_ZONE,
    })
    expect(body.start).toEqual({ dateTime: "2026-06-21T10:30:00", timeZone: HOME_ZONE })
    expect(body.end).toEqual({ dateTime: "2026-06-21T11:30:00", timeZone: HOME_ZONE })
  })

  test("sets a normalized recurrence array when recurrence is provided", () => {
    const body = buildEventRequestBody({
      summary: "Sacrament Meeting",
      start: "2026-06-21T10:30:00",
      end: "2026-06-21T11:30:00",
      recurrence: ["FREQ=WEEKLY;BYDAY=SU"],
    })
    expect(body.recurrence).toEqual(["RRULE:FREQ=WEEKLY;BYDAY=SU"])
  })

  test("preserves commas inside an RRULE body (BYDAY lists)", () => {
    const body = buildEventRequestBody({
      summary: "Elders Quorum",
      start: "2026-06-21T11:30:00",
      end: "2026-06-21T12:30:00",
      recurrence: ["RRULE:FREQ=MONTHLY;BYDAY=2SU,4SU"],
    })
    expect(body.recurrence).toEqual(["RRULE:FREQ=MONTHLY;BYDAY=2SU,4SU"])
  })

  test("omits timezone and recurrence when absent", () => {
    const body = buildEventRequestBody({
      summary: "Meet",
      start: "2026-06-10T15:00:00Z",
      end: "2026-06-10T15:30:00Z",
    })
    expect(body.start).toEqual({ dateTime: "2026-06-10T15:00:00Z" })
    expect("recurrence" in body).toBe(false)
  })

  test("emits all-day {date} payloads for date-only start/end", () => {
    const body = buildEventRequestBody({
      summary: "Holiday",
      start: "2026-07-08",
      end: "2026-07-09",
    })
    expect(body.start).toEqual({ date: "2026-07-08" })
    expect(body.end).toEqual({ date: "2026-07-09" })
  })

  test("rejects a mixed date-only start with a timed end", () => {
    expect(() =>
      buildEventRequestBody({
        summary: "Mixed",
        start: "2026-07-08",
        end: "2026-07-09T10:00:00Z",
      })
    ).toThrow(/date-only/i)
  })

  test("rejects a timed start with a date-only end", () => {
    expect(() =>
      buildEventRequestBody({
        summary: "Mixed",
        start: "2026-07-08T10:00:00Z",
        end: "2026-07-09",
      })
    ).toThrow(/date-only/i)
  })

  test("rejects a timezone combined with a date-only (all-day) event", () => {
    expect(() =>
      buildEventRequestBody({
        summary: "Holiday",
        start: "2026-07-08",
        end: "2026-07-09",
        timezone: HOME_ZONE,
      })
    ).toThrow(/all-day/i)
  })
})

describe("normalizeRecurrence", () => {
  test("prepends RRULE: when absent and preserves it when present", () => {
    expect(normalizeRecurrence(["FREQ=WEEKLY;BYDAY=SU"])).toEqual(["RRULE:FREQ=WEEKLY;BYDAY=SU"])
    expect(normalizeRecurrence(["RRULE:FREQ=WEEKLY;BYDAY=SU"])).toEqual([
      "RRULE:FREQ=WEEKLY;BYDAY=SU",
    ])
  })

  test("strips a leading RRULE: case-insensitively and trims whitespace", () => {
    expect(normalizeRecurrence(["  rrule:FREQ=DAILY  "])).toEqual(["RRULE:FREQ=DAILY"])
  })

  test("normalizes each rule in a multi-rule array independently", () => {
    expect(normalizeRecurrence(["FREQ=MONTHLY;BYDAY=2SU,4SU", "RRULE:FREQ=YEARLY"])).toEqual([
      "RRULE:FREQ=MONTHLY;BYDAY=2SU,4SU",
      "RRULE:FREQ=YEARLY",
    ])
  })
})

describe("buildPatchRequestBody", () => {
  test("includes only provided fields", () => {
    const body = buildPatchRequestBody({
      eventId: "evt1",
      summary: "Renamed",
    })
    expect(body).toEqual({ summary: "Renamed" })
  })

  test("attaches timeZone to patched start/end boundaries", () => {
    const body = buildPatchRequestBody({
      eventId: "evt1",
      start: "2026-06-21T10:30:00",
      end: "2026-06-21T11:30:00",
      timezone: HOME_ZONE,
    })
    expect(body.start).toEqual({ dateTime: "2026-06-21T10:30:00", timeZone: HOME_ZONE })
    expect(body.end).toEqual({ dateTime: "2026-06-21T11:30:00", timeZone: HOME_ZONE })
  })

  test("includes a normalized recurrence array when provided", () => {
    const body = buildPatchRequestBody({
      eventId: "evt1",
      recurrence: ["FREQ=WEEKLY;BYDAY=SU"],
    })
    expect(body.recurrence).toEqual(["RRULE:FREQ=WEEKLY;BYDAY=SU"])
  })

  test("emits all-day {date} payloads when both boundaries are date-only", () => {
    const body = buildPatchRequestBody({
      eventId: "evt1",
      start: "2026-07-08",
      end: "2026-07-09",
    })
    expect(body.start).toEqual({ date: "2026-07-08" })
    expect(body.end).toEqual({ date: "2026-07-09" })
  })

  test("emits a date-only start alone without cross-field rejection", () => {
    const body = buildPatchRequestBody({
      eventId: "evt1",
      start: "2026-07-08",
    })
    expect(body.start).toEqual({ date: "2026-07-08" })
    expect("end" in body).toBe(false)
  })

  test("rejects a mixed date-only/timed patch when both boundaries are present", () => {
    expect(() =>
      buildPatchRequestBody({
        eventId: "evt1",
        start: "2026-07-08",
        end: "2026-07-09T10:00:00Z",
      })
    ).toThrow(/date-only/i)
  })

  test("rejects a timezone combined with a date-only patched boundary", () => {
    expect(() =>
      buildPatchRequestBody({
        eventId: "evt1",
        start: "2026-07-08",
        end: "2026-07-09",
        timezone: HOME_ZONE,
      })
    ).toThrow(/all-day/i)
  })
})

describe("buildListParams", () => {
  test("maps from/to/query/max and sets singleEvents + orderBy", () => {
    const params = buildListParams(
      {
        from: "2026-06-01T00:00:00Z",
        to: "2026-06-30T23:59:59Z",
        query: "standup",
        max: 10,
      },
      "cal-a"
    )
    expect(params).toEqual({
      calendarId: "cal-a",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: "2026-06-01T00:00:00Z",
      timeMax: "2026-06-30T23:59:59Z",
      q: "standup",
      maxResults: 10,
    })
  })

  test("omits absent optional filters", () => {
    const params = buildListParams({}, "cal-b")
    expect(params).toEqual({
      calendarId: "cal-b",
      singleEvents: true,
      orderBy: "startTime",
    })
  })
})

describe("computeRsvpAttendees", () => {
  test("sets only the self attendee's responseStatus and reports matched", () => {
    const result = computeRsvpAttendees(
      [
        { email: "jen@example.com", responseStatus: "accepted", organizer: true },
        { email: "alan@example.com", self: true, responseStatus: "needsAction" },
      ],
      "declined"
    )
    expect(result.matched).toBe(true)
    expect(result.attendees).toEqual([
      { email: "jen@example.com", responseStatus: "accepted", organizer: true },
      { email: "alan@example.com", self: true, responseStatus: "declined" },
    ])
  })

  test("preserves every other attendee's fields untouched (no array-replace data loss)", () => {
    const others = [
      { email: "a@example.com", responseStatus: "tentative", comment: "maybe" },
      { email: "b@example.com", responseStatus: "declined", resource: true },
    ]
    const result = computeRsvpAttendees(
      [...others, { email: "alan@example.com", self: true, responseStatus: "needsAction" }],
      "accepted"
    )
    expect(result.attendees.slice(0, 2)).toEqual(others)
  })

  test("preserves the self attendee's other fields, changing only responseStatus", () => {
    const result = computeRsvpAttendees(
      [{ email: "alan@example.com", self: true, displayName: "Alan", responseStatus: "accepted" }],
      "tentative"
    )
    expect(result.attendees[0]).toEqual({
      email: "alan@example.com",
      self: true,
      displayName: "Alan",
      responseStatus: "tentative",
    })
  })

  test("reports matched=false and leaves the list unchanged when no self attendee", () => {
    const attendees = [
      { email: "jen@example.com", responseStatus: "accepted" },
      { email: "bob@example.com", responseStatus: "needsAction" },
    ]
    const result = computeRsvpAttendees(attendees, "declined")
    expect(result.matched).toBe(false)
    expect(result.attendees).toEqual(attendees)
  })

  test("handles an empty attendee list as matched=false", () => {
    expect(computeRsvpAttendees([], "accepted")).toEqual({ attendees: [], matched: false })
  })

  test("does not mutate the input attendees", () => {
    const input = [{ email: "alan@example.com", self: true, responseStatus: "needsAction" }]
    const snapshot = structuredClone(input)
    computeRsvpAttendees(input, "declined")
    expect(input).toEqual(snapshot)
  })
})

describe("googleRsvpEventSchema", () => {
  test("parses attendees as open records, preserving unknown fields", () => {
    const parsed = googleRsvpEventSchema.parse({
      id: "evt-1",
      summary: "Sacrament Meeting",
      attendees: [
        { email: "alan@example.com", self: true, responseStatus: "needsAction", extra: "kept" },
      ],
    })
    expect(parsed.attendees).toEqual([
      { email: "alan@example.com", self: true, responseStatus: "needsAction", extra: "kept" },
    ])
  })

  test("tolerates an event with no attendees array", () => {
    const parsed = googleRsvpEventSchema.parse({ id: "evt-2" })
    expect(parsed.attendees).toBeUndefined()
  })
})
