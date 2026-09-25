import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noMoreShipmentsFromSentinel = {
  id: "01a0d5f6-d68b-75af-9ce0-a01797cd7428",
  type: "page-type/temper-lore-book",
  slug: "no-more-shipments-from-sentinel",
  title: "No More Shipments From Sentinel",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3242,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
