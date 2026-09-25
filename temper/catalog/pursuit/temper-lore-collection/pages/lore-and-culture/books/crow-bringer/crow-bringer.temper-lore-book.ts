import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crowBringer = {
  id: "01a0d5f3-3fda-7ae5-bf1a-c2e721fe6790",
  type: "page-type/temper-lore-book",
  slug: "crow-bringer",
  title: "Crow Bringer",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1110,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
