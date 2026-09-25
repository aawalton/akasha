import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordsOfSkyrim = {
  id: "01a0d5e4-6057-76c2-b5d1-43f30719a7d4",
  type: "page-type/temper-lore-book",
  slug: "nords-of-skyrim",
  title: "Nords of Skyrim",
  collection: "temper-lore-collection/stonefalls-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
