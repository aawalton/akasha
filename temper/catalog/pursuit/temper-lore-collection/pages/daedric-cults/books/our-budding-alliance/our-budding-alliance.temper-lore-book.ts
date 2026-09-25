import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourBuddingAlliance = {
  id: "01a0d5f2-253b-733e-8e45-c446dd11b1a5",
  type: "page-type/temper-lore-book",
  slug: "our-budding-alliance",
  title: "Our Budding Alliance",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 560,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
