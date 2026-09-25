import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anUnexpectedDefense = {
  id: "01a0d5f5-7766-786c-a6b7-ae7d0d257eab",
  type: "page-type/temper-lore-book",
  slug: "an-unexpected-defense",
  title: "An Unexpected Defense",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1459,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
