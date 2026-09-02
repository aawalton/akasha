import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IncludeInChildAggregates = boolean

export const includeInChildAggregates = {
  id: "01a05fcb-d654-77c9-bc2c-4f4d426d11c3",
  pageTypeSlug: "boolean-property",
  slug: "include-in-child-aggregates",
  propertySlug: "include-in-child-aggregates",
  definition: "whether a node's own number is counted into the totals beneath it",
} as const satisfies BooleanProperty
