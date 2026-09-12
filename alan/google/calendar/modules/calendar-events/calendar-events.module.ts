import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const calendarEvents = {
  id: "01a05c02-c735-7c7d-b0df-e9fdf86fe475",
  type: "module",
  slug: "calendar-events",
  definition: "the calendar operations one event is put through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calendar named `primary` means Alan's own calendar.",
    },
    {
      invariantKind: "departure",
      statement: "A write is named as soon as the calendar has taken that write.",
    },
    {
      invariantKind: "departure",
      statement: "A write that emailed the attendees is named as having emailed them.",
    },
    {
      invariantKind: "departure",
      statement: "A delete is named nowhere, because nothing after it can throw.",
    },
    {
      invariantKind: "departure",
      statement: "Answering an invitation the signed-in account is not an attendee on is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A listing is expanded to single events and ordered by start time.",
    },
  ],
} as const satisfies Module
