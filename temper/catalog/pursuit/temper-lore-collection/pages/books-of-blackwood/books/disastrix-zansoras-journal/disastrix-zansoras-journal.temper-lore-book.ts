import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const disastrixZansorasJournal = {
  id: "01a0d60b-fdaf-7d65-943d-bb2150748411",
  type: "page-type/temper-lore-book",
  slug: "disastrix-zansoras-journal",
  title: "Disastrix Zansora's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6517,
  bookIndex: 19,
  charted: true,
  quest: 6616,
  positions: "jsonl",
} as const satisfies TemperLoreBook
