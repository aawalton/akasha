import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToDarius = {
  id: "01a0d5f1-f451-7604-a5f7-da0581741f20",
  type: "page-type/temper-lore-book",
  slug: "note-to-darius",
  title: "Note to Darius",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1532,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
