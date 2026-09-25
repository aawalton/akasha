import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skorkhifsConundrum = {
  id: "01a0d60d-ff6a-7094-9c02-ebd571d04b7d",
  type: "page-type/temper-lore-book",
  slug: "skorkhifs-conundrum",
  title: "Skorkhif's Conundrum",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8401,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
