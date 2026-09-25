import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsOfTheFallen = {
  id: "01a0d60a-d5be-7627-9370-8be06c12feed",
  type: "page-type/temper-lore-book",
  slug: "words-of-the-fallen",
  title: "Words of the Fallen",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4896,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 32, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
