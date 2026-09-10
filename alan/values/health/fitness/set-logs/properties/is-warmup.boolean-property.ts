import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type IsWarmup = boolean

export const isWarmup = {
  id: "01a06580-66fd-7fa5-a1e7-cf110721d7bf",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "is-warmup",
  propertySlug: "is-warmup",
  definition: "whether the set was preparation rather than working volume",
} as const satisfies BooleanProperty
