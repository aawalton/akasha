import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAbbreviatedHistoryOfSkingrad = {
  id: "01a0d60d-4aae-789c-8b52-4a36029f7016",
  type: "page-type/temper-lore-book",
  slug: "an-abbreviated-history-of-skingrad",
  title: "An Abbreviated History of Skingrad",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7997,
  bookIndex: 98,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
