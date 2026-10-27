import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const itemCategory = {
  id: "01a17eb7-e856-713c-916b-7668b2ac629e",
  type: "page-type/select-property",
  slug: "item-category",
  propertySlug: "category",
  definition: "the sort of thing an item is",
  values: ["armor", "consumable", "material", "tool", "weapon"],
  types: "ts",
  createdAt: "2026-10-27T18:55:44.214Z",
  updatedAt: "2026-10-27T18:55:44.214Z",
} as const satisfies SelectProperty
