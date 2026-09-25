import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromFarrulLupus = {
  id: "01a0d60b-fdb0-7bf6-96a8-ff64daf55e00",
  type: "page-type/temper-lore-book",
  slug: "letter-from-farrul-lupus",
  title: "Letter from Farrul Lupus",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6670,
  bookIndex: 8,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
