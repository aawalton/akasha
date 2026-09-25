import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const takingTolls = {
  id: "01a0d5f1-f452-7c4e-a5c3-0ca849a51310",
  type: "page-type/temper-lore-book",
  slug: "taking-tolls",
  title: "Taking Tolls!",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2243,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
