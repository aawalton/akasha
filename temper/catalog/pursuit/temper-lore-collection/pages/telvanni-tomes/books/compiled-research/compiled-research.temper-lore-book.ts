import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const compiledResearch = {
  id: "01a0d60c-eb9b-7bd2-bb92-a6ed6a19f2bb",
  type: "page-type/temper-lore-book",
  slug: "compiled-research",
  title: "Compiled Research",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7640,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
