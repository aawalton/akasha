import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blackVineRuins = {
  id: "01a0d5f6-45ad-72d7-9098-3cec2ddc543a",
  type: "page-type/temper-lore-book",
  slug: "black-vine-ruins",
  title: "Black Vine Ruins",
  collection: "temper-lore-collection/final-words",
  esoBookId: 567,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
