import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWolfAndThePirateQueen = {
  id: "01a0d5f7-73fb-7d96-a644-33c2c5d5fceb",
  type: "page-type/temper-lore-book",
  slug: "the-wolf-and-the-pirate-queen",
  title: "The Wolf and the Pirate Queen",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3257,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
