import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol25 = {
  id: "01a0d5f5-7768-7569-a9fe-e3bde631354d",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-25",
  title: "The Year 2920, Vol. 25",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2629,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 25, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
