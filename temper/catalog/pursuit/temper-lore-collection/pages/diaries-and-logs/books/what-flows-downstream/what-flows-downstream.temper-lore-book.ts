import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatFlowsDownstream = {
  id: "01a0d5f2-509f-7c78-89e0-72f24e4fa5aa",
  type: "page-type/temper-lore-book",
  slug: "what-flows-downstream",
  title: "What Flows Downstream",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 668,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
