import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSpottedTowers = {
  id: "01a0d60c-eb9c-7925-b958-9608366bac69",
  type: "page-type/temper-lore-book",
  slug: "the-spotted-towers",
  title: "The Spotted Towers",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7806,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
