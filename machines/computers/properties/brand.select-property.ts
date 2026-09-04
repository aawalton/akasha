import type { SelectProperty } from "@akasha/pages-system/select-property"

export const brand = {
  id: "01a0658c-329a-722f-84d0-e955a0c75ab0",
  pageTypeSlug: "select-property",
  slug: "brand",
  propertySlug: "brand",
  definition: "who made it",
  values: ["msi", "apple", "hp", "dell", "cyberpowerpc", "ibuypower", "corsair"],
} as const satisfies SelectProperty

export type Brand = (typeof brand.values)[number]
