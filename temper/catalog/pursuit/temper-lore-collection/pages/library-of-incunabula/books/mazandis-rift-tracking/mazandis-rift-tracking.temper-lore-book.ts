import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mazandisRiftTracking = {
  id: "01a0d5f8-02f9-7ca3-8e65-628c09aae6e3",
  type: "page-type/temper-lore-book",
  slug: "mazandis-rift-tracking",
  title: "Mazandi's Rift Tracking",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7474,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
