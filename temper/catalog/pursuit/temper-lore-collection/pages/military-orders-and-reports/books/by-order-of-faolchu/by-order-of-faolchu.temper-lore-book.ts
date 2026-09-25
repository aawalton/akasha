import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const byOrderOfFaolchu = {
  id: "01a0d5f3-7052-7e69-bcd7-06f8e5888619",
  type: "page-type/temper-lore-book",
  slug: "by-order-of-faolchu",
  title: "By Order of Faolchu",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2460,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
