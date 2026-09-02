import type { TextProperty } from "@akasha/pages-system/text-property"

export type LastSyncedAt = string

export const lastSyncedAt = {
  id: "01a06243-144b-7003-9923-3ff8f87cca0f",
  pageTypeSlug: "text-property",
  slug: "last-synced-at",
  propertySlug: "last-synced-at",
  definition: "the day a page was last fetched from its provider",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day is written as an ISO 8601 calendar day.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a day rather than text.",
    },
  ],
} as const satisfies TextProperty
