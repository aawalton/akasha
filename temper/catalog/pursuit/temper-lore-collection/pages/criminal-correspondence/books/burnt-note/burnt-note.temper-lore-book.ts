import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burntNote = {
  id: "01a0d5f1-f450-7398-9094-fd085c665404",
  type: "page-type/temper-lore-book",
  slug: "burnt-note",
  title: "Burnt Note",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 508,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
