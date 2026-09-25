import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mantraOfExpulsion = {
  id: "01a0d5f7-4293-7f47-934f-5b61d7147f04",
  type: "page-type/temper-lore-book",
  slug: "mantra-of-expulsion",
  title: "Mantra of Expulsion",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3245,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
