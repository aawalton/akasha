import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToOtumiRa = {
  id: "01a0d60b-fdb0-7b7a-8226-edb838e13af5",
  type: "page-type/temper-lore-book",
  slug: "letter-to-otumi-ra",
  title: "Letter to Otumi-Ra",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6698,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
