import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLastWillOfRolandVolcy = {
  id: "01a0d5f6-45ae-7fa8-a935-858d68b29b26",
  type: "page-type/temper-lore-book",
  slug: "the-last-will-of-roland-volcy",
  title: "The Last Will of Roland Volcy",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1300,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
