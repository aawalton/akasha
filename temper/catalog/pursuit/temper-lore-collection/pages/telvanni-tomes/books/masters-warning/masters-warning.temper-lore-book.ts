import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mastersWarning = {
  id: "01a0d60c-eb9b-7756-afdb-e84d92f6a77f",
  type: "page-type/temper-lore-book",
  slug: "masters-warning",
  title: "Master's Warning",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7580,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
