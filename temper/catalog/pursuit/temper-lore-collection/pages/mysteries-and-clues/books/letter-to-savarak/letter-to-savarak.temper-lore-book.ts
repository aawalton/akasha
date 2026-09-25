import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSavarak = {
  id: "01a0d5f4-07b8-792b-9bff-c565b9181ed2",
  type: "page-type/temper-lore-book",
  slug: "letter-to-savarak",
  title: "Letter to Savarak",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 3964,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
