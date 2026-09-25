import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackwaterWarVolume2 = {
  id: "01a0d5f6-a29a-733e-9750-ad05a7ee66f2",
  type: "page-type/temper-lore-book",
  slug: "the-blackwater-war-volume-2",
  title: "The Blackwater War, Volume 2",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2815,
  bookIndex: 16,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 34, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
