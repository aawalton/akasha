import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const book4InstrumentOfVengeance = {
  id: "01a0d60c-75b4-7e44-a607-8f179f251f02",
  type: "page-type/temper-lore-book",
  slug: "book-4-instrument-of-vengeance",
  title: "4. Instrument of Vengeance",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7150,
  bookIndex: 11,
  charted: true,
  quest: 6796,
  positions: "jsonl",
} as const satisfies TemperLoreBook
