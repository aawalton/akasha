import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greenPactBosmerObservations = {
  id: "01a0d5f3-3fda-73f7-9238-e0724c2f0477",
  type: "page-type/temper-lore-book",
  slug: "green-pact-bosmer-observations",
  title: "Green Pact Bosmer: Observations",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1824,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
