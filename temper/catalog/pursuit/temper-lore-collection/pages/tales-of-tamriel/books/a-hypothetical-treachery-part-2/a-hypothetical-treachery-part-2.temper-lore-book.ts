import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHypotheticalTreacheryPart2 = {
  id: "01a0d5f5-7765-725b-b613-d9bc123f614b",
  type: "page-type/temper-lore-book",
  slug: "a-hypothetical-treachery-part-2",
  title: "A Hypothetical Treachery, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 829,
  bookIndex: 38,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 21 },
    { mapId: 12, mapCount: 8 },
    { mapId: 13, mapCount: 13 },
    { mapId: 27, mapCount: 3 },
  ],
} as const satisfies TemperLoreBook
