import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aFittingTribute = {
  id: "01a0d5f2-509e-73e5-a6cf-cafab29c3714",
  type: "page-type/temper-lore-book",
  slug: "a-fitting-tribute",
  title: "A Fitting Tribute",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 729,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
