import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTractsPerilous = {
  id: "01a0d60d-156e-73cc-aab3-23df6406b16c",
  type: "page-type/temper-lore-book",
  slug: "on-tracts-perilous",
  title: "On Tracts Perilous",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7430,
  bookIndex: 16,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2275, mapCount: 1 }],
} as const satisfies TemperLoreBook
