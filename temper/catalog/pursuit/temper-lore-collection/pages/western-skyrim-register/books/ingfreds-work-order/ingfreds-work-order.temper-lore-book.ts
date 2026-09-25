import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ingfredsWorkOrder = {
  id: "01a0d60b-a361-7557-b44f-ef886e59ba34",
  type: "page-type/temper-lore-book",
  slug: "ingfreds-work-order",
  title: "Ingfred's Work Order",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6114,
  bookIndex: 25,
  charted: true,
  quest: 6535,
  positions: "jsonl",
} as const satisfies TemperLoreBook
