import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFaceless = {
  id: "01a0d5f5-abba-7d8e-956d-970e0f3a610d",
  type: "page-type/temper-lore-book",
  slug: "the-faceless",
  title: "The Faceless",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1944,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
