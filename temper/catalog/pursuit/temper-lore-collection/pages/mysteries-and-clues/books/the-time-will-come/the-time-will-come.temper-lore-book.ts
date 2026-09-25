import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTimeWillCome = {
  id: "01a0d5f4-07b9-7779-8068-bcd1d679dfb3",
  type: "page-type/temper-lore-book",
  slug: "the-time-will-come",
  title: "The Time Will Come",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1172,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
