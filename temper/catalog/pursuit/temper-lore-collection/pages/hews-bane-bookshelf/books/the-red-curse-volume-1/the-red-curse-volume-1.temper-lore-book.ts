import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRedCurseVolume1 = {
  id: "01a0d5f7-4294-7831-a24f-b60623b16f71",
  type: "page-type/temper-lore-book",
  slug: "the-red-curse-volume-1",
  title: "The Red Curse, Volume 1",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3429,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
