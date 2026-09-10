import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PointsSourceMarker = string

export const pointsSourceMarker = {
  id: "01a060b8-bfaf-7001-b626-ffc219688a43",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "points-source-marker",
  propertySlug: "marker",
  definition: "the name of the thing a persona's points are counted from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A marker names a kind of source rather than one persona's source.",
    },
  ],
} as const satisfies TextProperty
