import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const pointsSourceKind = {
  id: "01a060b8-bfaf-7000-b61f-c5cef054df9e",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "points-source-kind",
  propertySlug: "kind",
  definition: "how a persona's points are worked out from what she counts",
  values: ["external", "windowed", "direct", "manual", "seed", "stoplights", "unavailable"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A writer outside the engine computes the points of a source stated external.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
