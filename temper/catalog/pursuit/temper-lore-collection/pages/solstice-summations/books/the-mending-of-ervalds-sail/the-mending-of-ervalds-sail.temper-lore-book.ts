import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMendingOfErvaldsSail = {
  id: "01a0d60d-ff6a-7368-93de-f220094b6a1c",
  type: "page-type/temper-lore-book",
  slug: "the-mending-of-ervalds-sail",
  title: "The Mending of Ervald's Sail",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8232,
  bookIndex: 59,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
