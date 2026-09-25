import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNightMotherWatches = {
  id: "01a0d5f3-0ef8-70b1-9ed5-f5d5e744468e",
  type: "page-type/temper-lore-book",
  slug: "the-night-mother-watches",
  title: "The Night Mother Watches",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1927,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
