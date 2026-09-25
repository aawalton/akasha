import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const colovianDesertersJournal = {
  id: "01a0d5f4-c383-7f31-8b8a-9babf13ab34a",
  type: "page-type/temper-lore-book",
  slug: "colovian-deserters-journal",
  title: "Colovian Deserter's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1853,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
