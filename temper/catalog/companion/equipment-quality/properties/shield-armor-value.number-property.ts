import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const shieldArmorValue = {
  id: "01a0de9c-51fd-7e3a-a8bd-a5cae0e91e37",
  type: "page-type/number-property",
  slug: "shield-armor-value",
  propertySlug: "shield-armor-value",
  definition: "the armor a companion shield of a quality gives",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
