import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromMinique = {
  id: "01a0d5f3-0ef7-79e8-8663-61ad9c4b0bca",
  type: "page-type/temper-lore-book",
  slug: "letter-from-minique",
  title: "Letter from Minique",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 661,
  bookIndex: 19,
  charted: true,
  quest: 4266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
