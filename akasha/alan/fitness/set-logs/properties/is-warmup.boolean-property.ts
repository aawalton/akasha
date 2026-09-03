import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsWarmup = boolean

export const isWarmup = {
  id: "01a06580-66fd-7fa5-a1e7-cf110721d7bf",
  pageTypeSlug: "boolean-property",
  slug: "is-warmup",
  propertySlug: "is-warmup",
  definition: "whether the set was preparation rather than working volume",
} as const satisfies BooleanProperty
