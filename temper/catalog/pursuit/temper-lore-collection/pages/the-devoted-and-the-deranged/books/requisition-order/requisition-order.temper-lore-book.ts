import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const requisitionOrder = {
  id: "01a0d5f5-abba-7126-bb43-12607d588310",
  type: "page-type/temper-lore-book",
  slug: "requisition-order",
  title: "Requisition Order",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2666,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
