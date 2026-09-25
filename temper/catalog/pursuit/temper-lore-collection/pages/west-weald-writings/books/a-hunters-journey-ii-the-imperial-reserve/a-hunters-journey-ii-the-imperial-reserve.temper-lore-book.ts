import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHuntersJourneyIiTheImperialReserve = {
  id: "01a0d60d-4aae-75fd-bd58-1945524f24cd",
  type: "page-type/temper-lore-book",
  slug: "a-hunters-journey-ii-the-imperial-reserve",
  title: "A Hunter's Journey II: The Imperial Reserve",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7781,
  bookIndex: 4,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
