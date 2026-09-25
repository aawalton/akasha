import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gildedLetter = {
  id: "01a0d5f1-f451-7b2b-9d4e-7c9f0e54723f",
  type: "page-type/temper-lore-book",
  slug: "gilded-letter",
  title: "Gilded Letter",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 496,
  bookIndex: 12,
  charted: true,
  quest: 4209,
  positions: "jsonl",
} as const satisfies TemperLoreBook
