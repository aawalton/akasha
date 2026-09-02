import type { TextProperty } from "@akasha/pages-system/text-property"

export type PointsSourceWeightField = string

export const pointsSourceWeightField = {
  id: "01a060b8-bfaf-7005-af73-3c898c950a0a",
  pageTypeSlug: "text-property",
  slug: "points-source-weight-field",
  propertySlug: "weight-field",
  definition: "which value on each counted thing decides how much it counts for",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source added up by weight states the field its weight is read from.",
    },
  ],
} as const satisfies TextProperty
