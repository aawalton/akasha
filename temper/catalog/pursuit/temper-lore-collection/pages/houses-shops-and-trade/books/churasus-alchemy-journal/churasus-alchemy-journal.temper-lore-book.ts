import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const churasusAlchemyJournal = {
  id: "01a0d5f2-db25-7a0b-bf9a-379c9cc70885",
  type: "page-type/temper-lore-book",
  slug: "churasus-alchemy-journal",
  title: "Churasu's Alchemy Journal",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 958,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
