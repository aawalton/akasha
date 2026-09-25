import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const contractScroll = {
  id: "01a0d5f3-7052-751f-b3ae-118e413cf625",
  type: "page-type/temper-lore-book",
  slug: "contract-scroll",
  title: "Contract Scroll",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 143,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
