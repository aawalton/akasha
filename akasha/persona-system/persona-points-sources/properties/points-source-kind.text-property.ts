import type { TextProperty } from "@akasha/pages-system/text-property"

export type PointsSourceKind =
  | "external"
  | "windowed"
  | "direct"
  | "manual"
  | "seed"
  | "stoplights"
  | "unavailable"

export const pointsSourceKind = {
  id: "01a060b8-bfaf-7000-b61f-c5cef054df9e",
  pageTypeSlug: "text-property",
  slug: "points-source-kind",
  propertySlug: "kind",
  definition: "how a persona's points are worked out from what she counts",
  max: 11,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A writer outside the engine computes the points of a source stated external.",
    },
  ],
} as const satisfies TextProperty
