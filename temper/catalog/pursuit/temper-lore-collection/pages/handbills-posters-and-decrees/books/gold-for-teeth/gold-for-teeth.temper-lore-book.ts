import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldForTeeth = {
  id: "01a0d5f2-83a2-72ab-b86e-beaabc07a9d0",
  type: "page-type/temper-lore-book",
  slug: "gold-for-teeth",
  title: "Gold for Teeth!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1099,
  bookIndex: 44,
  charted: true,
  quest: 3039,
  positions: "jsonl",
} as const satisfies TemperLoreBook
