import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const councilorAborsJournal = {
  id: "01a0d60b-fdaf-7bc9-9abf-a778328a44a2",
  type: "page-type/temper-lore-book",
  slug: "councilor-abors-journal",
  title: "Councilor Abor's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6673,
  bookIndex: 12,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
