import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theVashabarThreat = {
  id: "01a0d60d-4ab0-7282-9c23-fb5aac13a8cc",
  type: "page-type/temper-lore-book",
  slug: "the-vashabar-threat",
  title: "The Vashabar Threat",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7809,
  bookIndex: 95,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
