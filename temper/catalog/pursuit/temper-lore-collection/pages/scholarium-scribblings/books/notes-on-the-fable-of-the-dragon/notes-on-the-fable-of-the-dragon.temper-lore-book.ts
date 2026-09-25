import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnTheFableOfTheDragon = {
  id: "01a0d60d-9a63-7795-ab7f-6bd16ec045f2",
  type: "page-type/temper-lore-book",
  slug: "notes-on-the-fable-of-the-dragon",
  title: "Notes on the Fable of the Dragon",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8107,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
