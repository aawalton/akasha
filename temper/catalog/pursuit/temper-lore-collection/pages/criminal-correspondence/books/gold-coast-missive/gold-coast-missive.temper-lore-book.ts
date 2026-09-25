import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldCoastMissive = {
  id: "01a0d5f1-f451-7684-9bde-985482877e78",
  type: "page-type/temper-lore-book",
  slug: "gold-coast-missive",
  title: "Gold Coast Missive",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 482,
  bookIndex: 11,
  charted: true,
  quest: 4196,
  positions: "jsonl",
} as const satisfies TemperLoreBook
