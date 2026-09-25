import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mudcrabOrderRequest = {
  id: "01a0d5f7-4294-710e-a7ce-b47e70dab1ca",
  type: "page-type/temper-lore-book",
  slug: "mudcrab-order-request",
  title: "Mudcrab Order Request",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3514,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
