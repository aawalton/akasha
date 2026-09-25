import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const veryOldNote = {
  id: "01a0d5f4-07b9-73cc-88ff-adaf0a82c2e0",
  type: "page-type/temper-lore-book",
  slug: "very-old-note",
  title: "Very Old Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4036,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
