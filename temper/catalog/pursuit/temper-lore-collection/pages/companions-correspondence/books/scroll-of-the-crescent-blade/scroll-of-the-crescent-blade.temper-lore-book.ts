import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrollOfTheCrescentBlade = {
  id: "01a0d60d-bbe4-7d3b-b9fd-80e0e9ff675a",
  type: "page-type/temper-lore-book",
  slug: "scroll-of-the-crescent-blade",
  title: "Scroll of the Crescent Blade",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8137,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
