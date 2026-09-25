import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heartOfTheIndrik = {
  id: "01a0d60a-f1ec-7145-8e5f-d5b9cb89fbd0",
  type: "page-type/temper-lore-book",
  slug: "heart-of-the-indrik",
  title: "Heart of the Indrik",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4816,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
