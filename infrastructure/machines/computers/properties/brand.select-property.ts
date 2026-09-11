import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const brand = {
  id: "01a0658c-329a-722f-84d0-e955a0c75ab0",
  type: "select-property",
  slug: "brand",
  propertySlug: "brand",
  definition: "who made it",
  values: ["msi", "apple", "hp", "dell", "cyberpowerpc", "ibuypower", "corsair"],
  types: "ts",
} as const satisfies SelectProperty
