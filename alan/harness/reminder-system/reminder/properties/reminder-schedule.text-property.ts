import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const reminderSchedule = {
  id: "01a05f42-d941-7006-a1ef-7866d346525a",
  type: "page-type/text-property",
  slug: "reminder-schedule",
  propertySlug: "schedule",
  definition: "the times a reminder is sent at, written as systemd states a calendar",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Systemd reads a schedule rather than a parser of our own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule naming one absolute time does not repeat.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:16:51.649Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
