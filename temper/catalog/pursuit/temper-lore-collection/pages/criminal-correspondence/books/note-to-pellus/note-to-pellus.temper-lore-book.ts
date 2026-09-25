import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToPellus = {
  id: "01a0d5f1-f451-7815-b1cd-cabff324cba7",
  type: "page-type/temper-lore-book",
  slug: "note-to-pellus",
  title: "Note to Pellus",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1530,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
