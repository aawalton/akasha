import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTheGrandChanter = {
  id: "01a0d5f7-73fa-79da-bb03-279978a1e139",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-grand-chanter",
  title: "Letter to the Grand Chanter",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3739,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
