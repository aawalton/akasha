import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRedCurseVolume2 = {
  id: "01a0d5f7-4294-7483-a7ed-416960324237",
  type: "page-type/temper-lore-book",
  slug: "the-red-curse-volume-2",
  title: "The Red Curse, Volume 2",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3430,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
