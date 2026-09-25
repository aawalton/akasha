import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const councilorJirichsRecords = {
  id: "01a0d60b-fdaf-7aee-9b68-32e56d54c2df",
  type: "page-type/temper-lore-book",
  slug: "councilor-jirichs-records",
  title: "Councilor Jirich's Records",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6445,
  bookIndex: 10,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
