import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const almalexiaAndTheMudcrab = {
  id: "01a0d5f5-7766-7b6b-b0fe-beb15614e30b",
  type: "page-type/temper-lore-book",
  slug: "almalexia-and-the-mudcrab",
  title: "Almalexia and the Mudcrab",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2405,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 20 },
    { mapId: 9, mapCount: 38 },
    { mapId: 10, mapCount: 12 },
    { mapId: 12, mapCount: 35 },
    { mapId: 13, mapCount: 59 },
    { mapId: 16, mapCount: 9 },
    { mapId: 26, mapCount: 8 },
    { mapId: 27, mapCount: 15 },
    { mapId: 143, mapCount: 7 },
    { mapId: 255, mapCount: 15 },
    { mapId: 660, mapCount: 8 },
    { mapId: 667, mapCount: 2 },
    { mapId: 1060, mapCount: 3 },
    { mapId: 1126, mapCount: 16 },
  ],
} as const satisfies TemperLoreBook
