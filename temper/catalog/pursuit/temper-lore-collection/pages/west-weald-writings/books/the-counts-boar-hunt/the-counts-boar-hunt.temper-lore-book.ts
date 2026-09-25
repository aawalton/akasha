import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCountsBoarHunt = {
  id: "01a0d60d-4ab0-7e7d-b34d-f37bc737cde9",
  type: "page-type/temper-lore-book",
  slug: "the-counts-boar-hunt",
  title: "The Count's Boar Hunt",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8124,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
