import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromChillHollow = {
  id: "01a0d5f2-af70-77c9-813d-7dc299c1b3df",
  type: "page-type/temper-lore-book",
  slug: "letter-from-chill-hollow",
  title: "Letter from Chill Hollow",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 469,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
