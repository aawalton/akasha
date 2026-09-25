import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arenaNote = {
  id: "01a0d5f7-73f9-7027-9fee-140367ea712f",
  type: "page-type/temper-lore-book",
  slug: "arena-note",
  title: "Arena Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3668,
  bookIndex: 37,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
