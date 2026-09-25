import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGlenmorilWyrd = {
  id: "01a0d5e3-1969-7050-a700-167966f52a79",
  type: "page-type/temper-lore-book",
  slug: "the-glenmoril-wyrd",
  title: "The Glenmoril Wyrd",
  collection: "temper-lore-collection/bangkorai-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
