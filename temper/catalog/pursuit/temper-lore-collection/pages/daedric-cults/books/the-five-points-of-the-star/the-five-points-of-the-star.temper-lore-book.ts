import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFivePointsOfTheStar = {
  id: "01a0d5f2-253b-7c49-85d1-ee7653f1bfdc",
  type: "page-type/temper-lore-book",
  slug: "the-five-points-of-the-star",
  title: "The Five Points of the Star",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1100,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
