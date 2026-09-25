import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aThirdScrapOfParchment = {
  id: "01a0d5f4-07b7-77aa-bd6a-db41d3a10e5e",
  type: "page-type/temper-lore-book",
  slug: "a-third-scrap-of-parchment",
  title: "A Third Scrap of Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1000,
  bookIndex: 23,
  charted: true,
  quest: 4337,
  positions: "jsonl",
} as const satisfies TemperLoreBook
