import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const byTheMastersMace = {
  id: "01a0d5f5-abb9-7027-b739-dd38f9b7d63b",
  type: "page-type/temper-lore-book",
  slug: "by-the-masters-mace",
  title: "By the Master's Mace",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2040,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
