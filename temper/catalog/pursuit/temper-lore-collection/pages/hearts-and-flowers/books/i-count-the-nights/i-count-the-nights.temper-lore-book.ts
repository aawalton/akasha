import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iCountTheNights = {
  id: "01a0d5f2-af70-7553-b706-f4e19b7bd081",
  type: "page-type/temper-lore-book",
  slug: "i-count-the-nights",
  title: "I Count the Nights",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1384,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
