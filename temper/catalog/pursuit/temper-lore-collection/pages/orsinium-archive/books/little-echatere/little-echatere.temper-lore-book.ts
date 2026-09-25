import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const littleEchatere = {
  id: "01a0d5f7-160b-7302-87d9-c9f7ae7c1c36",
  type: "page-type/temper-lore-book",
  slug: "little-echatere",
  title: "Little Echatere",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3236,
  bookIndex: 52,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 27, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
