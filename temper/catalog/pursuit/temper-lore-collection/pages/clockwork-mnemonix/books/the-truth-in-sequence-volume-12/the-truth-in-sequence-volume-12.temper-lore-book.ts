import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTruthInSequenceVolume12 = {
  id: "01a0d60a-a214-7edb-978f-0278ce3875d0",
  type: "page-type/temper-lore-book",
  slug: "the-truth-in-sequence-volume-12",
  title: "The Truth in Sequence: Volume 12",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4709,
  bookIndex: 75,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 31, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
