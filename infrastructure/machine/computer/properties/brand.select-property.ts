import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const brand = {
  id: "01a0658c-329a-722f-84d0-e955a0c75ab0",
  type: "page-type/select-property",
  slug: "brand",
  propertySlug: "brand",
  definition: "who made it",
  values: ["msi", "apple", "hp", "dell", "cyberpowerpc", "ibuypower", "corsair"],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
