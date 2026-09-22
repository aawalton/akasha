import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const attributeValue = {
  id: "01a0c9f6-de0c-7810-8942-34a3d216752c",
  type: "page-type/number-property",
  slug: "attribute-value",
  propertySlug: "value",
  definition: "the number an attribute has",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
