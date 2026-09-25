import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rootsOfSilvenar = {
  id: "01a0d5f4-c389-774a-ad9a-7e1782f64822",
  type: "page-type/temper-lore-book",
  slug: "roots-of-silvenar",
  title: "Roots of Silvenar",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 569,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
