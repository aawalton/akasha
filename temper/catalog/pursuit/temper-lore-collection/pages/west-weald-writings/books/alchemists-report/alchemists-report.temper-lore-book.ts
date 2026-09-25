import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alchemistsReport = {
  id: "01a0d60d-4aae-7dfe-a68b-5c631af9a6d6",
  type: "page-type/temper-lore-book",
  slug: "alchemists-report",
  title: "Alchemist's Report",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7887,
  bookIndex: 24,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
