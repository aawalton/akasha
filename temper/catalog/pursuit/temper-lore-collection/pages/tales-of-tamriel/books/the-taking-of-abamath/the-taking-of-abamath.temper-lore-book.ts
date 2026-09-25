import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTakingOfAbamath = {
  id: "01a0d5f5-7767-72e9-b6db-2c86f5cc8771",
  type: "page-type/temper-lore-book",
  slug: "the-taking-of-abamath",
  title: "The Taking of Abamath",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 626,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
