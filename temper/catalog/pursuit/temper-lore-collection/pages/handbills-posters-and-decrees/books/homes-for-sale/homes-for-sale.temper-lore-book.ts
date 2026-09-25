import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const homesForSale = {
  id: "01a0d5f2-83a2-7861-b8af-49b07e016725",
  type: "page-type/temper-lore-book",
  slug: "homes-for-sale",
  title: "Homes for Sale!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 3970,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
