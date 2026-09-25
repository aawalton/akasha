import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const essentialKnotsForSailing = {
  id: "01a0d60e-687e-787d-83f1-6c40fa85699b",
  type: "page-type/temper-lore-book",
  slug: "essential-knots-for-sailing",
  title: "Essential Knots for Sailing",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8725,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
