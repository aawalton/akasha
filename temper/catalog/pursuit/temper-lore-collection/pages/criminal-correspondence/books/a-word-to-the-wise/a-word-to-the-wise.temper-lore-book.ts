import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aWordToTheWise = {
  id: "01a0d5f1-f450-7fb4-ad69-1984f17ce91a",
  type: "page-type/temper-lore-book",
  slug: "a-word-to-the-wise",
  title: "A Word to the Wise",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1568,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
