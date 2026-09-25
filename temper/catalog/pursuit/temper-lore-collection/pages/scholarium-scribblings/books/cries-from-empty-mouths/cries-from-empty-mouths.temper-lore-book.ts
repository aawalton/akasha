import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const criesFromEmptyMouths = {
  id: "01a0d60d-9a63-7aa2-9463-5f916996a050",
  type: "page-type/temper-lore-book",
  slug: "cries-from-empty-mouths",
  title: "Cries from Empty Mouths",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8201,
  bookIndex: 32,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
