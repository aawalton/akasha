import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGoldRoadAMerchantsJourney = {
  id: "01a0d60d-4ab0-74f5-bd29-b732b65093a9",
  type: "page-type/temper-lore-book",
  slug: "the-gold-road-a-merchants-journey",
  title: "The Gold Road: A Merchant's Journey",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7784,
  bookIndex: 7,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
