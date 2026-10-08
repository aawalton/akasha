import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const placeDepth = {
  id: "01a0d42e-fdd4-7681-86a9-535b7194e760",
  type: "page-type/number-property",
  slug: "place-depth",
  propertySlug: "depth",
  definition: "how far into its world a place sits, counted the way that world counts",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside another takes the depth of the place it is inside.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T16:10:44.564Z",
  updatedAt: "2026-09-24T16:20:45.000Z",
} as const satisfies NumberProperty
