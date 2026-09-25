import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lastWordsOfADevotee = {
  id: "01a0d5f6-45ad-7c27-9062-5176251c4b42",
  type: "page-type/temper-lore-book",
  slug: "last-words-of-a-devotee",
  title: "Last Words of a Devotee",
  collection: "temper-lore-collection/final-words",
  esoBookId: 67,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
