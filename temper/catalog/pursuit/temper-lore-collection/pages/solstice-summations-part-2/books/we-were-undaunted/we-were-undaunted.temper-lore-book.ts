import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weWereUndaunted = {
  id: "01a0d60e-45b3-7c01-8734-44dedfbc72b4",
  type: "page-type/temper-lore-book",
  slug: "we-were-undaunted",
  title: "We Were Undaunted",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8576,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
