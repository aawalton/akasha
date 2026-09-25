import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cartorrelsLastWords = {
  id: "01a0d60a-d5bc-7129-8b9c-c3ad99dcfd29",
  type: "page-type/temper-lore-book",
  slug: "cartorrels-last-words",
  title: "Cartorrel's Last Words",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4997,
  bookIndex: 100,
  charted: true,
  quest: 6149,
  positions: "jsonl",
} as const satisfies TemperLoreBook
