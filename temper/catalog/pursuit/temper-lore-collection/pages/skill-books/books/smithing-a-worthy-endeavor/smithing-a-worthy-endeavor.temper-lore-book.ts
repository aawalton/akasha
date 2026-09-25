import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const smithingAWorthyEndeavor = {
  id: "01a0d5f6-6d41-7fd1-adfc-c48c4777fd05",
  type: "page-type/temper-lore-book",
  slug: "smithing-a-worthy-endeavor",
  title: "Smithing: A Worthy Endeavor",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2453,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
