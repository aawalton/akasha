import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export type PointsSourceAggregate = "bytes" | "count" | "sum" | "weighted"

export const pointsSourceAggregate = {
  id: "01a060b8-bfaf-7002-8d8d-62373bc372fa",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "points-source-aggregate",
  propertySlug: "aggregate",
  definition: "how the things a persona counts are added into one number",
  values: ["bytes", "count", "sum", "weighted"],
} as const satisfies SelectProperty
