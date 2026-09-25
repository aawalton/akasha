import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const defaultNumber = {
  id: "01a0d925-d415-7ce7-b9c2-74e85a36a640",
  type: "page-type/number-property",
  slug: "default-number",
  propertySlug: "default-number",
  definition: "the default of a property holding a number",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
