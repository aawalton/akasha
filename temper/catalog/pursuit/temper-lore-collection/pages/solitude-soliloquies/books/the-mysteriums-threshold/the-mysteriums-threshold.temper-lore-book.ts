import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMysteriumsThreshold = {
  id: "01a0d60b-8109-71ee-83e8-16cb41185727",
  type: "page-type/temper-lore-book",
  slug: "the-mysteriums-threshold",
  title: "The Mysterium's Threshold",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6014,
  bookIndex: 67,
  charted: true,
  quest: 6510,
  positions: "jsonl",
} as const satisfies TemperLoreBook
