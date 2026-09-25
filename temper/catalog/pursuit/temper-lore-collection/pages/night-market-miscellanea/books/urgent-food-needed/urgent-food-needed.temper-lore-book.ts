import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const urgentFoodNeeded = {
  id: "01a0d60e-687f-7bc9-9345-0687628a4ee6",
  type: "page-type/temper-lore-book",
  slug: "urgent-food-needed",
  title: "Urgent! Food Needed",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8673,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
