import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancientHuntersJournal = {
  id: "01a0d60d-9a63-79ea-8f3f-f7f0280c15c0",
  type: "page-type/temper-lore-book",
  slug: "ancient-hunters-journal",
  title: "Ancient Hunter's Journal",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8199,
  bookIndex: 30,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
