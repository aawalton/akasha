import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thingsLostThingsForgotten = {
  id: "01a0d60d-4ab0-78a2-a1e1-519a8a5868d7",
  type: "page-type/temper-lore-book",
  slug: "things-lost-things-forgotten",
  title: "Things Lost, Things Forgotten",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7885,
  bookIndex: 33,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
