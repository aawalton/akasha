import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setTraitsNeeded = {
  id: "01a0d8e1-0ec0-79aa-b417-2c2bbd22614e",
  type: "page-type/number-property",
  slug: "set-traits-needed",
  propertySlug: "set-traits-needed",
  definition: "how many traits a crafter must know to craft a set",
  max: 9,
  types: "ts",
} as const satisfies NumberProperty
