import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const progressInquiryCyrodiil = {
  id: "01a0d5f3-7053-7caa-8019-50108b19938e",
  type: "page-type/temper-lore-book",
  slug: "progress-inquiry-cyrodiil",
  title: "Progress Inquiry: Cyrodiil",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2281,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
