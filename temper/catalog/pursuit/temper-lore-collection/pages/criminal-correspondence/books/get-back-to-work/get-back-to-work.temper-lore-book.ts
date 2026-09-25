import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const getBackToWork = {
  id: "01a0d5f1-f451-70f5-85c9-f571a8a1f18f",
  type: "page-type/temper-lore-book",
  slug: "get-back-to-work",
  title: "Get Back to Work",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1217,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
