import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theChorrolCrier = {
  id: "01a0d5f2-509f-72f7-9fb9-5a785d7aa381",
  type: "page-type/temper-lore-book",
  slug: "the-chorrol-crier",
  title: "The Chorrol Crier",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2259,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
