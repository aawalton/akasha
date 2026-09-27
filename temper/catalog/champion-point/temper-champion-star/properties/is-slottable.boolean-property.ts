import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const isSlottable = {
  id: "01a0e135-d98c-7297-b329-ba1e346e0b3e",
  type: "page-type/boolean-property",
  slug: "is-slottable",
  propertySlug: "is-slottable",
  definition: "whether a champion star works only while slotted, rather than as a passive",
  types: "ts",
} as const satisfies BooleanProperty
