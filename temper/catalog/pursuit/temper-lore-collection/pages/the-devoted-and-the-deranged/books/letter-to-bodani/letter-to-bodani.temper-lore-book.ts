import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBodani = {
  id: "01a0d5f5-abba-72c5-aaee-1e1a45350d88",
  type: "page-type/temper-lore-book",
  slug: "letter-to-bodani",
  title: "Letter to Bodani",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2336,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
