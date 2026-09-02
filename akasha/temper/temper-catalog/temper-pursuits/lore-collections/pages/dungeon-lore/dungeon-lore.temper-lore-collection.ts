import type { TemperLoreCollection } from "../../temper-lore-collection.page-type.ts"

export const dungeonLore = {
  id: "01a06343-f9fa-7067-b9d1-382e1bd8dfb1",
  pageTypeSlug: "temper-lore-collection",
  slug: "dungeon-lore",
  title: "Dungeon Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 11,
  books: "jsonl",
} as const satisfies TemperLoreCollection
