import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersSteelheartMoorings = {
  id: "01a0d5f3-7053-732e-afa9-e8e973164135",
  type: "page-type/temper-lore-book",
  slug: "orders-steelheart-moorings",
  title: "Orders: Steelheart Moorings",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 89,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
