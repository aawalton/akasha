import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDeathBlowOfAbernanit = {
  id: "01a0d5f6-1c16-7beb-afce-f7eed00aaeeb",
  type: "page-type/temper-lore-book",
  slug: "the-death-blow-of-abernanit",
  title: "The Death Blow of Abernanit",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 820,
  bookIndex: 25,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 19 },
    { mapId: 12, mapCount: 8 },
    { mapId: 13, mapCount: 18 },
    { mapId: 27, mapCount: 5 },
  ],
} as const satisfies TemperLoreBook
