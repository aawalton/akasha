import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PointsSourceAggregate = "bytes" | "count" | "sum" | "weighted"

export const pointsSourceAggregate = {
  id: "01a060b8-bfaf-7002-8d8d-62373bc372fa",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "points-source-aggregate",
  propertySlug: "aggregate",
  definition: "how the things a persona counts are added into one number",
  maxLength: 8,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
