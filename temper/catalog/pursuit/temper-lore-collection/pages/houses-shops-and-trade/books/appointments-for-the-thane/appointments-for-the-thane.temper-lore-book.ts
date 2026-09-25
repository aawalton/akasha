import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const appointmentsForTheThane = {
  id: "01a0d5f2-db25-79ff-b1df-e8a4fda2a07f",
  type: "page-type/temper-lore-book",
  slug: "appointments-for-the-thane",
  title: "Appointments for the Thane",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1339,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
