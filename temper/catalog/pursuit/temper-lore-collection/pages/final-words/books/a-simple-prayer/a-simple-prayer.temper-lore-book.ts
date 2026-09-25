import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSimplePrayer = {
  id: "01a0d5f6-45ad-706d-aa7b-5e236d05d1b6",
  type: "page-type/temper-lore-book",
  slug: "a-simple-prayer",
  title: "A Simple Prayer",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2530,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
