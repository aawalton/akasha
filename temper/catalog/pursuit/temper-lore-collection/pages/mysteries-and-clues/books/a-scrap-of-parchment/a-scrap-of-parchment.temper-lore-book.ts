import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aScrapOfParchment = {
  id: "01a0d5f4-07b6-7556-b883-69a405d61904",
  type: "page-type/temper-lore-book",
  slug: "a-scrap-of-parchment",
  title: "A Scrap of Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 998,
  charted: true,
  quest: 4337,
  positions: "jsonl",
} as const satisfies TemperLoreBook
