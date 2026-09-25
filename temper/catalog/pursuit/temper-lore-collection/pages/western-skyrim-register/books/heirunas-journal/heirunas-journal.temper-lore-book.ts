import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heirunasJournal = {
  id: "01a0d60b-a361-755f-89b6-43f92d4e412b",
  type: "page-type/temper-lore-book",
  slug: "heirunas-journal",
  title: "Heiruna's Journal",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6041,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
