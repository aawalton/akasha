import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNewLord = {
  id: "01a0d5f2-253b-7820-96ea-d787891fd5c9",
  type: "page-type/temper-lore-book",
  slug: "the-new-lord",
  title: "The New Lord",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2755,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
