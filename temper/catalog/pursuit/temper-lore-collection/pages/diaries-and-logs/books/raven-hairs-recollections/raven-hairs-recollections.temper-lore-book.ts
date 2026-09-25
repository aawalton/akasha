import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ravenHairsRecollections = {
  id: "01a0d5f2-509f-7df2-906f-4dab7ca26f1d",
  type: "page-type/temper-lore-book",
  slug: "raven-hairs-recollections",
  title: "Raven-Hair's Recollections",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2075,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
