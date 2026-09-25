import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcsOfSkyrim = {
  id: "01a0d5e4-88db-71a6-b991-83f2dd638c47",
  type: "page-type/temper-lore-book",
  slug: "orcs-of-skyrim",
  title: "Orcs of Skyrim",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
