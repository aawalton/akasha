import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nafarionsNote = {
  id: "01a0d5f2-af70-7a73-b1a8-e790c83bfb86",
  type: "page-type/temper-lore-book",
  slug: "nafarions-note",
  title: "Nafarion's Note",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 4975,
  bookIndex: 78,
  charted: true,
  quest: 6176,
  positions: "jsonl",
} as const satisfies TemperLoreBook
