import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const faradansLetter = {
  id: "01a0d5f7-4293-7a9e-b7a7-7fa29cd5eb57",
  type: "page-type/temper-lore-book",
  slug: "faradans-letter",
  title: "Faradan's Letter",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3608,
  bookIndex: 76,
  charted: true,
  quest: 5581,
  positions: "jsonl",
} as const satisfies TemperLoreBook
