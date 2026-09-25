import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordCuisineSweetsEdition = {
  id: "01a0d60b-8108-7190-a080-9779fba8a32e",
  type: "page-type/temper-lore-book",
  slug: "nord-cuisine-sweets-edition",
  title: "Nord Cuisine: Sweets Edition",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6080,
  bookIndex: 33,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 38, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
