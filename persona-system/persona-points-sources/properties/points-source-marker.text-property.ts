import type { TextProperty } from "@akasha/pages-system/text-property"

export type PointsSourceMarker = string

export const pointsSourceMarker = {
  id: "01a060b8-bfaf-7001-b626-ffc219688a43",
  pageTypeSlug: "text-property",
  slug: "points-source-marker",
  propertySlug: "marker",
  definition: "the name of the thing a persona's points are counted from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A marker names a kind of source rather than one persona's source.",
    },
  ],
} as const satisfies TextProperty
