import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kinladysLetter = {
  id: "01a0d60a-d5bd-79d3-9ddf-fa605744e788",
  type: "page-type/temper-lore-book",
  slug: "kinladys-letter",
  title: "Kinlady's Letter",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4894,
  bookIndex: 40,
  charted: true,
  quest: 6096,
  positions: "jsonl",
} as const satisfies TemperLoreBook
