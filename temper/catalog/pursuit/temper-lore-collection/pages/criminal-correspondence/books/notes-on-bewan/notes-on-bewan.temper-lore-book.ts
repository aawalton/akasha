import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnBewan = {
  id: "01a0d5f1-f451-7971-80ee-a205bcd0ea35",
  type: "page-type/temper-lore-book",
  slug: "notes-on-bewan",
  title: "Notes on Bewan",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1311,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
