import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const resourceValue = {
  id: "01a0c9d2-3030-70e9-8cad-d903aeafc342",
  type: "page-type/number-property",
  slug: "resource-value",
  propertySlug: "value",
  definition: "what a resource holds now",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
