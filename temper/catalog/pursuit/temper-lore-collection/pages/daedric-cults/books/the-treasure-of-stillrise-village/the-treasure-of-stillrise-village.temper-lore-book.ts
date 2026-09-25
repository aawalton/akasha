import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTreasureOfStillriseVillage = {
  id: "01a0d5f2-253b-7e6f-8670-93f5e6f3536e",
  type: "page-type/temper-lore-book",
  slug: "the-treasure-of-stillrise-village",
  title: "The Treasure of Stillrise Village",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 665,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
