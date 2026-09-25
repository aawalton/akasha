import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sweetMoonSugarCane = {
  id: "01a0d60b-2345-7243-8839-1899b976d22b",
  type: "page-type/temper-lore-book",
  slug: "sweet-moon-sugar-cane",
  title: "Sweet Moon-Sugar Cane",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5599,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
