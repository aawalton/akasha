import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beveragesForTheBereaved = {
  id: "01a0d60c-eb9a-7237-88de-96d2aafb8097",
  type: "page-type/temper-lore-book",
  slug: "beverages-for-the-bereaved",
  title: "Beverages for the Bereaved",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7449,
  bookIndex: 55,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
