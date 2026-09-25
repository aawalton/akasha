import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const understandingHouseIndoril = {
  id: "01a0d5f7-aa9a-7f93-9d47-7ba70d26cad2",
  type: "page-type/temper-lore-book",
  slug: "understanding-house-indoril",
  title: "Understanding House Indoril",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4516,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
