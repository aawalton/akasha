import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreatMooring = {
  id: "01a0d5f4-c389-7cb8-96fd-f197a9a76d62",
  type: "page-type/temper-lore-book",
  slug: "the-great-mooring",
  title: "The Great Mooring",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1666,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
