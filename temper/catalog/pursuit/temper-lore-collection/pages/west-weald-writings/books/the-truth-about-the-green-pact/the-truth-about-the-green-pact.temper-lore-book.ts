import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTruthAboutTheGreenPact = {
  id: "01a0d60d-4ab0-73f5-9ef4-7f20d71e3ba0",
  type: "page-type/temper-lore-book",
  slug: "the-truth-about-the-green-pact",
  title: "The Truth About the Green Pact",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8004,
  bookIndex: 99,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
