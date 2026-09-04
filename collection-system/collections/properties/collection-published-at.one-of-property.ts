import type { OneOfProperty } from "@akasha/pages-system/one-of-property"
import type { PublishedAt } from "./published-at.instant-property.ts"
import type { PublishedDay } from "./published-day.calendar-date-property.ts"

export type CollectionPublishedAt = PublishedDay | PublishedAt

export const collectionPublishedAt = {
  id: "01a063de-2c60-700f-a1f5-3c8c3ba8a091",
  pageTypeSlug: "one-of-property",
  slug: "collection-published-at",
  propertySlug: "published-at",
  definition: "when a collection was released, to the day or to the moment",
  memberSlugs: ["calendar-date-property/published-day", "instant-property/published-at"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A release known only to the day is written as a day rather than as midnight.",
    },
  ],
} as const satisfies OneOfProperty
