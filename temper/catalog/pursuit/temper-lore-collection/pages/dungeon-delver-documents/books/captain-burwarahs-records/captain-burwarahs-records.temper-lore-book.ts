import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainBurwarahsRecords = {
  id: "01a0d60d-708d-75d8-b5b6-7b4431a96d2f",
  type: "page-type/temper-lore-book",
  slug: "captain-burwarahs-records",
  title: "Captain Burwarah's Records",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7795,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
