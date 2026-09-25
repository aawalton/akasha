import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deathOfAWanderer = {
  id: "01a0d5f5-7766-7eeb-9e4c-d9009bb1fd15",
  type: "page-type/temper-lore-book",
  slug: "death-of-a-wanderer",
  title: "Death of a Wanderer",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1142,
  bookIndex: 53,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 14 },
    { mapId: 27, mapCount: 2 },
    { mapId: 30, mapCount: 2 },
    { mapId: 61, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
