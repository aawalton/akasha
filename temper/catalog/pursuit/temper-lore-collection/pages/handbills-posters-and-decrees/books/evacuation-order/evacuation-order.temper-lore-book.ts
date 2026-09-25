import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const evacuationOrder = {
  id: "01a0d5f2-83a2-754e-8d1e-4ea159d2b4f8",
  type: "page-type/temper-lore-book",
  slug: "evacuation-order",
  title: "Evacuation Order",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 751,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
