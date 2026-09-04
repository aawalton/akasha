import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReminderText = string

export const reminderText = {
  id: "01a05f42-d941-7004-bf1f-acc8c93bb270",
  pageTypeSlug: "text-property",
  slug: "reminder-text",
  propertySlug: "text",
  definition: "the words a reminder sends",
  max: 6000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words are sent as written rather than filled in as the reminder sends.",
    },
  ],
} as const satisfies TextProperty
