import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSecondScrapOfParchment = {
  id: "01a0d5f4-07b7-7de7-b7f1-7b5b4f9ab778",
  type: "page-type/temper-lore-book",
  slug: "a-second-scrap-of-parchment",
  title: "A Second Scrap of Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 999,
  bookIndex: 22,
  charted: true,
  quest: 4337,
  positions: "jsonl",
} as const satisfies TemperLoreBook
