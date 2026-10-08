import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPrisonersJournal = {
  id: "01a0d5f5-abb9-7ac8-a731-7d96480d2842",
  type: "page-type/temper-lore-book",
  slug: "a-prisoners-journal",
  title: "A Prisoner's Journal",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1764,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:27:22.425Z",
  updatedAt: "2026-09-25T00:27:24.000Z",
} as const satisfies TemperLoreBook
