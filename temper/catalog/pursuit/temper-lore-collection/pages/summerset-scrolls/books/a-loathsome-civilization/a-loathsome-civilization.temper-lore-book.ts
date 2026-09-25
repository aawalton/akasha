import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLoathsomeCivilization = {
  id: "01a0d60a-d5bc-752b-8d4a-0572d04bba1e",
  type: "page-type/temper-lore-book",
  slug: "a-loathsome-civilization",
  title: "A Loathsome Civilization",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4494,
  bookIndex: 8,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 32, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
