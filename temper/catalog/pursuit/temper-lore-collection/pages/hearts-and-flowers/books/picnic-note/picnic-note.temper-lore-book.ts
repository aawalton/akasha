import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const picnicNote = {
  id: "01a0d5f2-af70-727a-bdcc-be37c9372984",
  type: "page-type/temper-lore-book",
  slug: "picnic-note",
  title: "Picnic Note",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 422,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
