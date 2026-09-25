import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendOfFathomsDrift = {
  id: "01a0d60d-156e-7945-9c89-2f1a35aa61dd",
  type: "page-type/temper-lore-book",
  slug: "the-legend-of-fathoms-drift",
  title: "The Legend of Fathoms Drift",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7421,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
