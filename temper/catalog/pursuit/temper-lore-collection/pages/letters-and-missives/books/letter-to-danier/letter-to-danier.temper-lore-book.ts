import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDanier = {
  id: "01a0d5f3-0ef8-76c4-a729-d97ac289366b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-danier",
  title: "Letter to Danier",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2472,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
