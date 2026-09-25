import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aFourthScrapOfParchment = {
  id: "01a0d5f4-07b6-77ee-a5b6-48aaeff715db",
  type: "page-type/temper-lore-book",
  slug: "a-fourth-scrap-of-parchment",
  title: "A Fourth Scrap of Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1001,
  bookIndex: 24,
  charted: true,
  quest: 4337,
  positions: "jsonl",
} as const satisfies TemperLoreBook
