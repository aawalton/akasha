import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nobleRanksAndTitles = {
  id: "01a0d60c-75b5-7811-b768-e7b294c2d9a3",
  type: "page-type/temper-lore-book",
  slug: "noble-ranks-and-titles",
  title: "Noble Ranks and Titles",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7121,
  bookIndex: 59,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2114, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
