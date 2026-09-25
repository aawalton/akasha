import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTruthInSequenceVolume1 = {
  id: "01a0d5f7-aa9a-7b3f-8cb4-25894b6b622e",
  type: "page-type/temper-lore-book",
  slug: "the-truth-in-sequence-volume-1",
  title: "The Truth in Sequence: Volume 1",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3993,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
