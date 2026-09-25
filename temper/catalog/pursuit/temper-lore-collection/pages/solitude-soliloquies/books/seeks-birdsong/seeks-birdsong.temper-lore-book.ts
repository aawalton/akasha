import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seeksBirdsong = {
  id: "01a0d60b-8109-7fc7-a0bc-53c6a3890a26",
  type: "page-type/temper-lore-book",
  slug: "seeks-birdsong",
  title: "Seeks-Birdsong",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5744,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
