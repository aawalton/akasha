import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const itsTheHuntThatCounts = {
  id: "01a0d5f1-f451-7a3e-beab-94fd16412a58",
  type: "page-type/temper-lore-book",
  slug: "its-the-hunt-that-counts",
  title: "It's the Hunt that Counts",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1844,
  bookIndex: 71,
  charted: true,
  quest: 4777,
  positions: "jsonl",
} as const satisfies TemperLoreBook
