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
  createdAt: "2026-09-25T00:50:29.438Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
