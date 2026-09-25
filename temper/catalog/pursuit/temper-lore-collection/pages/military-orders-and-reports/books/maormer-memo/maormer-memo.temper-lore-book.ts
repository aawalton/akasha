import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maormerMemo = {
  id: "01a0d5f3-7053-7b7b-8d01-76bdd3c040bb",
  type: "page-type/temper-lore-book",
  slug: "maormer-memo",
  title: "Maormer Memo",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 721,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
