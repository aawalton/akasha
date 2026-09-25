import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const torvesardsJournal = {
  id: "01a0d60d-156e-7bba-84dc-80fdf64b83ed",
  type: "page-type/temper-lore-book",
  slug: "torvesards-journal",
  title: "Torvesard's Journal",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7453,
  bookIndex: 26,
  charted: true,
  quest: 6977,
  positions: "jsonl",
} as const satisfies TemperLoreBook
