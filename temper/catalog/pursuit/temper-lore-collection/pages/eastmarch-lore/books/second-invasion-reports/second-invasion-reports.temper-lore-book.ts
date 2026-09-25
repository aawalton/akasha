import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secondInvasionReports = {
  id: "01a0d5e4-88db-703e-acbd-931a4ff99914",
  type: "page-type/temper-lore-book",
  slug: "second-invasion-reports",
  title: "Second Invasion: Reports",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
