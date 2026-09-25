import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSoundingHorn = {
  id: "01a0d5f5-abbb-7fce-b3a4-995e5eb32ea5",
  type: "page-type/temper-lore-book",
  slug: "the-sounding-horn",
  title: "The Sounding Horn",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 769,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
