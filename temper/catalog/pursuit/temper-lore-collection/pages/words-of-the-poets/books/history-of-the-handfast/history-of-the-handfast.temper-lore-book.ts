import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const historyOfTheHandfast = {
  id: "01a0d5f6-1c15-7891-a881-2a89895e4d27",
  type: "page-type/temper-lore-book",
  slug: "history-of-the-handfast",
  title: "History of the Handfast",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 742,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
