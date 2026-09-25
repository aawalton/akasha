import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crowsWoodTravelersLog = {
  id: "01a0d5f6-45ad-7f84-82d7-6e8f46d97127",
  type: "page-type/temper-lore-book",
  slug: "crows-wood-travelers-log",
  title: "Crow's Wood Traveler's Log",
  collection: "temper-lore-collection/final-words",
  esoBookId: 82,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
