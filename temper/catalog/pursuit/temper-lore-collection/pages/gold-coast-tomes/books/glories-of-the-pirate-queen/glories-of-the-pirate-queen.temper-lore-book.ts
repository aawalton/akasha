import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gloriesOfThePirateQueen = {
  id: "01a0d5f7-73fa-7a04-a48f-cd48be28151c",
  type: "page-type/temper-lore-book",
  slug: "glories-of-the-pirate-queen",
  title: "Glories of the Pirate Queen",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3652,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
