import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAstara = {
  id: "01a0d60b-fdb0-7d72-8af0-f9e37d018b96",
  type: "page-type/temper-lore-book",
  slug: "letter-from-astara",
  title: "Letter from Astara",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6505,
  bookIndex: 13,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
