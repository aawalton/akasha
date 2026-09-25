import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRedCurseVolume3 = {
  id: "01a0d5f7-4294-7767-addc-70a4b9cc1a06",
  type: "page-type/temper-lore-book",
  slug: "the-red-curse-volume-3",
  title: "The Red Curse, Volume 3",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3431,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
