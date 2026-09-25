import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minersJournal = {
  id: "01a0d60b-8108-7a4d-ad2d-00c59e6d061b",
  type: "page-type/temper-lore-book",
  slug: "miners-journal",
  title: "Miner's Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5899,
  bookIndex: 37,
  charted: true,
  quest: 6480,
  positions: "jsonl",
} as const satisfies TemperLoreBook
