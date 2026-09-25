import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rumorsOfTheSpiralSkein = {
  id: "01a0d5f2-253b-71b5-a8b1-88de53f6d43d",
  type: "page-type/temper-lore-book",
  slug: "rumors-of-the-spiral-skein",
  title: "Rumors of the Spiral Skein",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2639,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
