import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missingMiners = {
  id: "01a0d60b-8108-78ac-acf6-29169a5a8346",
  type: "page-type/temper-lore-book",
  slug: "missing-miners",
  title: "Missing Miners",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5817,
  bookIndex: 94,
  charted: true,
  quest: 6471,
  positions: "jsonl",
} as const satisfies TemperLoreBook
