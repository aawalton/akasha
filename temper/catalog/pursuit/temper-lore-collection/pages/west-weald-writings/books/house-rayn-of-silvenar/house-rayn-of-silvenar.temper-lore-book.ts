import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRaynOfSilvenar = {
  id: "01a0d60d-4aaf-72f4-b8a3-e1d095dd3f96",
  type: "page-type/temper-lore-book",
  slug: "house-rayn-of-silvenar",
  title: "House Rayn of Silvenar",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7783,
  bookIndex: 6,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
