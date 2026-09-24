import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const least = {
  id: "01a0c489-51d9-757c-a555-23b656cffa44",
  type: "page-type/number-property",
  slug: "least",
  propertySlug: "least",
  definition: "the smallest a character's value for an attribute may be",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
