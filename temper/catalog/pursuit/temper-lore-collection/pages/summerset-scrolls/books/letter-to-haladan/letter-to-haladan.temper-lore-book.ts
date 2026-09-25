import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHaladan = {
  id: "01a0d60a-d5bd-7776-8de1-04ce54fac1d0",
  type: "page-type/temper-lore-book",
  slug: "letter-to-haladan",
  title: "Letter to Haladan",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4697,
  bookIndex: 61,
  charted: true,
  quest: 6111,
  positions: "jsonl",
} as const satisfies TemperLoreBook
