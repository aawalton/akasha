import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCriminalMind = {
  id: "01a0d5f3-3fdb-715e-9a7c-eb1521d604e9",
  type: "page-type/temper-lore-book",
  slug: "the-criminal-mind",
  title: "The Criminal Mind",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2979,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
