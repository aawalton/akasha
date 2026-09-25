import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pirateQueenOfTheGoldCoast = {
  id: "01a0d5f7-73fa-7163-a45e-2b60b076e88c",
  type: "page-type/temper-lore-book",
  slug: "pirate-queen-of-the-gold-coast",
  title: "Pirate Queen of the Gold Coast",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3255,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
