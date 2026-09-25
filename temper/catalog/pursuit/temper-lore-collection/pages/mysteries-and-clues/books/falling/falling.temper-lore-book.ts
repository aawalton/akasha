import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const falling = {
  id: "01a0d5f4-07b7-7867-8584-e5be6c811707",
  type: "page-type/temper-lore-book",
  slug: "falling",
  title: "Falling",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2525,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
