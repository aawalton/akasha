import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hizrabisReport = {
  id: "01a0d5f1-f451-7fc9-b9f8-4b1905759085",
  type: "page-type/temper-lore-book",
  slug: "hizrabis-report",
  title: "Hizrabi's Report",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1955,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
