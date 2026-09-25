import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const balgvirsSiegeJournal = {
  id: "01a0d60b-8107-78e6-a354-e43ce8e60daa",
  type: "page-type/temper-lore-book",
  slug: "balgvirs-siege-journal",
  title: "Balgvir's Siege Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5944,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
