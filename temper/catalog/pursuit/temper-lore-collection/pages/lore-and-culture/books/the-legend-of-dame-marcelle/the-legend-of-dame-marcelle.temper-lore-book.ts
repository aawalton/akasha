import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendOfDameMarcelle = {
  id: "01a0d5f3-3fdb-7b20-a483-818b1c946af5",
  type: "page-type/temper-lore-book",
  slug: "the-legend-of-dame-marcelle",
  title: "The Legend of Dame Marcelle",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1968,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
