import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCollegiumPraxis = {
  id: "01a0d60d-ff6a-7b6d-bc99-96cf03e5e30b",
  type: "page-type/temper-lore-book",
  slug: "the-collegium-praxis",
  title: "The Collegium Praxis",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8453,
  bookIndex: 57,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
