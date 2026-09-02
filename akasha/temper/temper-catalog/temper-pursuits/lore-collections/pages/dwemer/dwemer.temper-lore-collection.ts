import type { TemperLoreCollection } from "../../temper-lore-collection.page-type.ts"

export const dwemer = {
  id: "01a06343-f9fa-7079-b291-22dd8d434b26",
  pageTypeSlug: "temper-lore-collection",
  slug: "dwemer",
  title: "Dwemer",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 12,
  books: "jsonl",
} as const satisfies TemperLoreCollection
