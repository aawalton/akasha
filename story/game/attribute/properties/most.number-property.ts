import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const most = {
  id: "01a0c489-7c26-7108-8b2f-220732c5c44e",
  type: "page-type/number-property",
  slug: "most",
  propertySlug: "most",
  definition: "the largest a character's value for an attribute may be",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
