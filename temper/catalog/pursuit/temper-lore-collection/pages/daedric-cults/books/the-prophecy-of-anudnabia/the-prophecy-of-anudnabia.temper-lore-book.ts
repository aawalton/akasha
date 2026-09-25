import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theProphecyOfAnudnabia = {
  id: "01a0d5f2-253b-7bce-be28-76490cb1bfb2",
  type: "page-type/temper-lore-book",
  slug: "the-prophecy-of-anudnabia",
  title: "The Prophecy of Anudnabia",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 8058,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
