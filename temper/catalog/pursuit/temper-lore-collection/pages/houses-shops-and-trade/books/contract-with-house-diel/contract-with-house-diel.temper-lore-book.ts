import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const contractWithHouseDiel = {
  id: "01a0d5f2-db25-713d-b80c-0b9c5183f0a1",
  type: "page-type/temper-lore-book",
  slug: "contract-with-house-diel",
  title: "Contract with House Diel",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1235,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
