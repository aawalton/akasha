import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resourceMaxValue = {
  id: "01a0c9d2-4d85-7b68-ae1f-c65a45558678",
  type: "page-type/number-property",
  slug: "resource-max-value",
  propertySlug: "max-value",
  definition: "the most a resource may hold",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
