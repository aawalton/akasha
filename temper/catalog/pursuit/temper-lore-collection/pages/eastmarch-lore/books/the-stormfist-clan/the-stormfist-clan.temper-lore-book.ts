import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStormfistClan = {
  id: "01a0d5e4-88dc-7fb1-8cad-5f84b96c7f51",
  type: "page-type/temper-lore-book",
  slug: "the-stormfist-clan",
  title: "The Stormfist Clan",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
