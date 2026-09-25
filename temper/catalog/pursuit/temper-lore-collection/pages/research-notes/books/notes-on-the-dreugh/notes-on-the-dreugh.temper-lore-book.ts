import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnTheDreugh = {
  id: "01a0d5f5-1385-7b1c-a527-39572df1ca69",
  type: "page-type/temper-lore-book",
  slug: "notes-on-the-dreugh",
  title: "Notes on the Dreugh",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 325,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
