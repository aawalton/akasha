import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const untilWeWanderHomeAgain = {
  id: "01a0d60d-4ab0-7d42-9ba2-d6507750fc3c",
  type: "page-type/temper-lore-book",
  slug: "until-we-wander-home-again",
  title: "Until We Wander Home Again",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7882,
  bookIndex: 37,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
