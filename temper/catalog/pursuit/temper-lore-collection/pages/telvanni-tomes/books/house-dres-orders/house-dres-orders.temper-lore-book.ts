import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseDresOrders = {
  id: "01a0d60c-eb9b-76cc-92b1-d32a18fac60b",
  type: "page-type/temper-lore-book",
  slug: "house-dres-orders",
  title: "House Dres Orders",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7696,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
