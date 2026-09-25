import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const concernsPetitionsComplaints = {
  id: "01a0d5f2-db25-7a20-8e9d-114993054de5",
  type: "page-type/temper-lore-book",
  slug: "concerns-petitions-complaints",
  title: "Concerns, Petitions, Complaints",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1900,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
