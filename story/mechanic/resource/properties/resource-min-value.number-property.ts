import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resourceMinValue = {
  id: "01a0c9d2-3ecb-7207-80aa-dd61d4bd3b55",
  type: "page-type/number-property",
  slug: "resource-min-value",
  propertySlug: "min-value",
  definition: "the least a resource may hold",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
