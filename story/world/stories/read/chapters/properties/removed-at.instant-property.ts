import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const removedAt = {
  id: "01a06554-d8bd-779b-9fbf-e9e8e3127e1f",
  type: "page-type/instant-property",
  slug: "removed-at",
  propertySlug: "removed-at",
  definition: "when the source a collection was read from took the collection down",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages akasha has of a collection are kept after the source takes the collection down.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:34:14.461Z",
  updatedAt: "2026-09-19T18:25:57.000Z",
} as const satisfies InstantProperty
