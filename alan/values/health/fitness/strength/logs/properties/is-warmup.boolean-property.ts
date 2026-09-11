import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isWarmup = {
  id: "01a06580-66fd-7fa5-a1e7-cf110721d7bf",
  type: "boolean-property",
  slug: "is-warmup",
  propertySlug: "is-warmup",
  definition: "whether the set was preparation rather than working volume",
  types: "ts",
} as const satisfies BooleanProperty
