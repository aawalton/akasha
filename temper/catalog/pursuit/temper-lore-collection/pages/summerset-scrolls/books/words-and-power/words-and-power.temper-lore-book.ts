import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsAndPower = {
  id: "01a0d60a-d5be-765a-a8f4-3e86e56ed266",
  type: "page-type/temper-lore-book",
  slug: "words-and-power",
  title: "Words and Power",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4877,
  bookIndex: 5,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 32, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
