import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PointsSourceReadingsReading = string
export type PointsSourceReadings = List<PointsSourceReadingsReading>

export const pointsSourceReadings = {
  id: "01a060b8-bfaf-7006-99ee-756f9ebe1b75",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "points-source-readings",
  propertySlug: "readings",
  definition:
    "which readings of Alan's day count towards a persona's points, and how many make one",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
