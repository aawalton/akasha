import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const heavyArmorValue = {
  id: "01a0de9c-51fd-71f3-944d-a936bb35821b",
  type: "page-type/number-property",
  slug: "heavy-armor-value",
  propertySlug: "heavy-armor-value",
  definition: "the armor a heavy companion armor piece of a quality gives",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
