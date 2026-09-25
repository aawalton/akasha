import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wayrestGuardOrders = {
  id: "01a0d5f2-83a4-711e-9ffa-5ac2d1c676b9",
  type: "page-type/temper-lore-book",
  slug: "wayrest-guard-orders",
  title: "Wayrest Guard Orders",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1252,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
