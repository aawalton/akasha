import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const calendarEvents = {
  id: "01a05c02-c735-7c7d-b0df-e9fdf86fe475",
  pageTypeSlug: "module",
  slug: "calendar-events",
  definition: "the calendar operations one event is put through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calendar named `primary` means Alan's own calendar.",
    },
    {
      invariantKind: "departure",
      statement: "Answering an invitation you are not an attendee on is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A listing is expanded to single events and ordered by start time.",
    },
  ],
} as const satisfies Module
