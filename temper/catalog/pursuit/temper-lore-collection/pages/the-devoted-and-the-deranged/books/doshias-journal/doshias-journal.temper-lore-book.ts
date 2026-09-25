import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const doshiasJournal = {
  id: "01a0d5f5-abb9-7ed1-b087-aad7374cb2a9",
  type: "page-type/temper-lore-book",
  slug: "doshias-journal",
  title: "Doshia's Journal",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 78,
  bookIndex: 3,
  charted: true,
  quest: 3856,
  positions: "jsonl",
} as const satisfies TemperLoreBook
