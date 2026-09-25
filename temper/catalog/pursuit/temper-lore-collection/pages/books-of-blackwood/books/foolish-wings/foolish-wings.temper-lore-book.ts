import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const foolishWings = {
  id: "01a0d60b-fdb0-7942-9690-a059a52a4d3e",
  type: "page-type/temper-lore-book",
  slug: "foolish-wings",
  title: "Foolish Wings",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6603,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
