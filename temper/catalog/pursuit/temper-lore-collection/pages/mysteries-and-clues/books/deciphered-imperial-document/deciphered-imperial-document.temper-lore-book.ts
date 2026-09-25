import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const decipheredImperialDocument = {
  id: "01a0d5f4-07b7-7144-b439-4c45bb412fbb",
  type: "page-type/temper-lore-book",
  slug: "deciphered-imperial-document",
  title: "Deciphered Imperial Document",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6446,
  charted: true,
  quest: 6612,
  positions: "jsonl",
} as const satisfies TemperLoreBook
