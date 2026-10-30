import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarEvents = {
  id: "01a05c02-c735-7c7d-b0df-e9fdf86fe475",
  type: "page-type/module",
  slug: "calendar-events",
  definition: "the calls that code makes about a calendar event",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calendar named `primary` means Alan's own calendar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is named as soon as the calendar has taken that write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that emailed the attendees is named as having emailed them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delete is named nowhere, because nothing after it can throw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Answering an invitation the signed-in account is not an attendee on is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is expanded to single events and ordered by start time.",
    },
  ],
  createdAt: "2026-09-01T08:08:01.077Z",
  updatedAt: "2026-10-30T15:34:46.504Z",
} as const satisfies Module
