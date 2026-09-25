import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lamentationsOfTheLost = {
  id: "01a0d5f6-1c16-7595-8d04-95d4b3fcabad",
  type: "page-type/temper-lore-book",
  slug: "lamentations-of-the-lost",
  title: "Lamentations of the Lost",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 746,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
