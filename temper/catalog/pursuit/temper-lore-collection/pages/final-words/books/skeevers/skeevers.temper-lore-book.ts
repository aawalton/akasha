import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skeevers = {
  id: "01a0d5f6-45ae-7824-82d3-bf85be5dd540",
  type: "page-type/temper-lore-book",
  slug: "skeevers",
  title: "Skeevers",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2531,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
