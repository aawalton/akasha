import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const essanyonsRecords = {
  id: "01a0d5f5-abb9-71fc-985a-c69a6591cceb",
  type: "page-type/temper-lore-book",
  slug: "essanyons-records",
  title: "Essanyon's Records",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 523,
  bookIndex: 16,
  charted: true,
  quest: 2715,
  positions: "jsonl",
} as const satisfies TemperLoreBook
