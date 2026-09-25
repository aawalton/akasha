import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const provisionRequests = {
  id: "01a0d5f2-db26-7bd4-809c-07a66cc2dde7",
  type: "page-type/temper-lore-book",
  slug: "provision-requests",
  title: "Provision Requests",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 419,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
