import { expect, test } from "bun:test"
import {
  resolveCalendarId,
  wroteSaid,
} from "akasha/alan/google/calendar/calendar-events/calendar-events.module.code.ts"

test("a calendar named `primary` means Alan's own calendar", () => {
  expect(resolveCalendarId("primary", "work@example.com")).not.toBe("work@example.com")
})

test("a write the calendar took names the calendar and what it took", () => {
  expect(wroteSaid("work@example.com", "a new event", "all")).toContain("work@example.com")
  expect(wroteSaid("work@example.com", "a new event", "all")).toContain("a new event")
})

test("a write that emailed the attendees says so", () => {
  expect(wroteSaid("work@example.com", "a new event", "all")).toContain("attendees were emailed")
  expect(wroteSaid("work@example.com", "a new event", "externalOnly")).toContain(
    "attendees were emailed"
  )
})

test("a write that emailed nobody says nothing of attendees", () => {
  expect(wroteSaid("work@example.com", "a new event", "none")).toBe(
    "work@example.com took a new event"
  )
})
