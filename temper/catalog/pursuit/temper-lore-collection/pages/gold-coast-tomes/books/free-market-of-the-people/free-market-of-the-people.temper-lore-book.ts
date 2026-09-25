import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const freeMarketOfThePeople = {
  id: "01a0d5f7-73f9-7a44-bade-49f37c06ed8a",
  type: "page-type/temper-lore-book",
  slug: "free-market-of-the-people",
  title: "Free Market of the People",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3682,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
