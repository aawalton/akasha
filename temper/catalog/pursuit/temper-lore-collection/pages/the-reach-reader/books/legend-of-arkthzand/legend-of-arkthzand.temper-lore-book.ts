import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfArkthzand = {
  id: "01a0d60b-c958-7462-b671-c441ca4558bf",
  type: "page-type/temper-lore-book",
  slug: "legend-of-arkthzand",
  title: "Legend of Arkthzand",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6393,
  bookIndex: 35,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 42, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
