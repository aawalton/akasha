import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToRufinus = {
  id: "01a0d5f1-f451-760e-b4bc-89761e9da692",
  type: "page-type/temper-lore-book",
  slug: "note-to-rufinus",
  title: "Note to Rufinus",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 481,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
