import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const floraAndFaunaOfTheBurn = {
  id: "01a0d60c-40c0-7f33-802a-821f7b8e9c74",
  type: "page-type/temper-lore-book",
  slug: "flora-and-fauna-of-the-burn",
  title: "Flora and Fauna of the Burn",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6591,
  bookIndex: 33,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2021, mapCount: 1 }],
} as const satisfies TemperLoreBook
