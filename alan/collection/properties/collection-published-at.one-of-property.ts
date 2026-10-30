import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const collectionPublishedAt = {
  id: "01a063de-2c60-700f-a1f5-3c8c3ba8a091",
  type: "page-type/one-of-property",
  slug: "collection-published-at",
  propertySlug: "published-at",
  definition: "the day or time a collection was published",
  members: ["calendar-date-property/published-day", "instant-property/published-at"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A release known only to the day is written as a day rather than as midnight.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-10-30T15:02:55.643Z",
} as const satisfies OneOfProperty
