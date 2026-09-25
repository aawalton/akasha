import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const passengersLogDisasterAtSea = {
  id: "01a0d5f6-d68b-7c8b-9883-edcf7f6c0945",
  type: "page-type/temper-lore-book",
  slug: "passengers-log-disaster-at-sea",
  title: "Passenger's Log: Disaster at Sea",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2797,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
