import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReminderSchedule = string

export const reminderSchedule = {
  id: "01a05f42-d941-7006-a1ef-7866d346525a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reminder-schedule",
  propertySlug: "schedule",
  definition: "the times a reminder is sent at, written as systemd states a calendar",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Systemd reads a schedule rather than a parser of our own.",
    },
    {
      invariantKind: "departure",
      statement: "A schedule naming one absolute time does not repeat.",
    },
  ],
} as const satisfies TextProperty
