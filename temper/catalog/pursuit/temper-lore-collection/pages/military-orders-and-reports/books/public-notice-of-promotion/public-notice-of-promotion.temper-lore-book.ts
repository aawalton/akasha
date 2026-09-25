import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const publicNoticeOfPromotion = {
  id: "01a0d5f3-7054-7335-89c5-85371dc12815",
  type: "page-type/temper-lore-book",
  slug: "public-notice-of-promotion",
  title: "Public Notice of Promotion",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1033,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
