import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLessRudeSong = {
  id: "01a0d5f6-1c15-7dca-ade5-ee62b44388fe",
  type: "page-type/temper-lore-book",
  slug: "a-less-rude-song",
  title: "A Less Rude Song",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 3170,
  bookIndex: 72,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 31, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
