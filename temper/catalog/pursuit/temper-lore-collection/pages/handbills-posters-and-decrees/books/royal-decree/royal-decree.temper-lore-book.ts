import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const royalDecree = {
  id: "01a0d5f2-83a3-76dc-a774-728f8d320218",
  type: "page-type/temper-lore-book",
  slug: "royal-decree",
  title: "Royal Decree",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 593,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
