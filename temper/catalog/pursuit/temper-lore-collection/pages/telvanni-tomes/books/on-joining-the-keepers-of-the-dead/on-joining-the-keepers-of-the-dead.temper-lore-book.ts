import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onJoiningTheKeepersOfTheDead = {
  id: "01a0d60c-eb9c-772f-a8a4-7d2c992d3dc8",
  type: "page-type/temper-lore-book",
  slug: "on-joining-the-keepers-of-the-dead",
  title: "On Joining the Keepers of the Dead",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7426,
  bookIndex: 32,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
} as const satisfies TemperLoreBook
