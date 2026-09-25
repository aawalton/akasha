import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const understandingHouseRedoran = {
  id: "01a0d5f7-aa9a-7134-8686-e35c4077c55c",
  type: "page-type/temper-lore-book",
  slug: "understanding-house-redoran",
  title: "Understanding House Redoran",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4518,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
