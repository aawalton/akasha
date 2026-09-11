import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const removedAt = {
  id: "01a06554-d8bd-779b-9fbf-e9e8e3127e1f",
  type: "instant-property",
  slug: "removed-at",
  propertySlug: "removed-at",
  definition: "when the source a collection was read from took the collection down",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages akasha has of a collection are kept after the source takes the collection down.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
