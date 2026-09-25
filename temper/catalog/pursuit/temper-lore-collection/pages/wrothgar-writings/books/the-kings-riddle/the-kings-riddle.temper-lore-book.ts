import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theKingsRiddle = {
  id: "01a0d5f6-d68c-7498-9cd1-8420d26b9cfc",
  type: "page-type/temper-lore-book",
  slug: "the-kings-riddle",
  title: "The King's Riddle",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3045,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
