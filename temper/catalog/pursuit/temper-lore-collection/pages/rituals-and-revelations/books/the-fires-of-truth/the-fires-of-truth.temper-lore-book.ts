import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFiresOfTruth = {
  id: "01a0d5f5-444c-7dc9-8d33-daf0ef269846",
  type: "page-type/temper-lore-book",
  slug: "the-fires-of-truth",
  title: "The Fires of Truth",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 956,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
