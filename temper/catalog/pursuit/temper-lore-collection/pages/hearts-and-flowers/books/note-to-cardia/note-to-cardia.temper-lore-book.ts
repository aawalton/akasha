import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToCardia = {
  id: "01a0d5f2-af70-7fe7-8706-d14b8d01ee21",
  type: "page-type/temper-lore-book",
  slug: "note-to-cardia",
  title: "Note to Cardia",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1531,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
