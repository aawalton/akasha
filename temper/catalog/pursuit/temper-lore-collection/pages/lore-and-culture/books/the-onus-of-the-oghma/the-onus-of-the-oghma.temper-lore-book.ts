import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOnusOfTheOghma = {
  id: "01a0d5f3-3fdb-7562-8d1e-e4958cd526fd",
  type: "page-type/temper-lore-book",
  slug: "the-onus-of-the-oghma",
  title: "The Onus of the Oghma",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1255,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
