import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const metricOfItem = {
  id: "01a0ca49-715d-7b33-94ee-db0c9c321b9c",
  type: "page-type/relation-property",
  slug: "metric-of-item",
  propertySlug: "item",
  definition: "the item a metric is kept for",
  targetPageType: "page-type/item",
  types: "ts",
} as const satisfies RelationProperty
