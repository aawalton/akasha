import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burntPapers = {
  id: "01a0d60b-8107-7ab8-ad23-1b337dc68e83",
  type: "page-type/temper-lore-book",
  slug: "burnt-papers",
  title: "Burnt Papers",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5770,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
