import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAmplificationCrystals = {
  id: "01a0d5f2-253b-72e7-bc97-5915cce8eba7",
  type: "page-type/temper-lore-book",
  slug: "the-amplification-crystals",
  title: "The Amplification Crystals",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1375,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
