import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sorrowsOfTheWind = {
  id: "01a0d60c-75b6-7b8c-92fe-ee058dc6a63b",
  type: "page-type/temper-lore-book",
  slug: "sorrows-of-the-wind",
  title: "Sorrows of the Wind",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7120,
  bookIndex: 48,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
