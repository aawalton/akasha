import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNaTotambuOfYokuda = {
  id: "01a0d5f5-f3e5-7518-9298-6f96330d1be4",
  type: "page-type/temper-lore-book",
  slug: "the-na-totambu-of-yokuda",
  title: "The Na-Totambu of Yokuda",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 300,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
