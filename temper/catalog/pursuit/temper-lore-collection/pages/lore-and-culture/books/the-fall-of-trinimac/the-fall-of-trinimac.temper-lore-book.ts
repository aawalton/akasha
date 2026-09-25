import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFallOfTrinimac = {
  id: "01a0d5f3-3fdb-7a9f-aa69-e808073d0bdf",
  type: "page-type/temper-lore-book",
  slug: "the-fall-of-trinimac",
  title: "The Fall of Trinimac",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 518,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
