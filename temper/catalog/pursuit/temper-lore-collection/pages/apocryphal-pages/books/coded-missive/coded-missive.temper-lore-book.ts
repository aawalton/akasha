import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const codedMissive = {
  id: "01a0d60d-156d-7008-8ef3-8fff0a242a4c",
  type: "page-type/temper-lore-book",
  slug: "coded-missive",
  title: "Coded Missive",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7554,
  bookIndex: 23,
  charted: true,
  quest: 6997,
  positions: "jsonl",
} as const satisfies TemperLoreBook
