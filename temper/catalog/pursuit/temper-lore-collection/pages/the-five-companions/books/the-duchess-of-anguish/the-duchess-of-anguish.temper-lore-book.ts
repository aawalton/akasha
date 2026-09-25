import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDuchessOfAnguish = {
  id: "01a0d5f5-c96e-721b-8b11-ec86991caf0a",
  type: "page-type/temper-lore-book",
  slug: "the-duchess-of-anguish",
  title: "The Duchess of Anguish",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1617,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
