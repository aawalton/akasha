import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTruthInSequenceVolume11 = {
  id: "01a0d60a-a214-7973-b436-85264faeb214",
  type: "page-type/temper-lore-book",
  slug: "the-truth-in-sequence-volume-11",
  title: "The Truth in Sequence: Volume 11",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4708,
  bookIndex: 74,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1313, mapCount: 1 },
    { mapId: 1429, mapCount: 1 },
  ],
} as const satisfies TemperLoreBook
