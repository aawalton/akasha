import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePenitentsTale = {
  id: "01a0d60c-40c1-7ae0-8c80-17efcc141361",
  type: "page-type/temper-lore-book",
  slug: "the-penitents-tale",
  title: "The Penitent's Tale",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6705,
  bookIndex: 36,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
