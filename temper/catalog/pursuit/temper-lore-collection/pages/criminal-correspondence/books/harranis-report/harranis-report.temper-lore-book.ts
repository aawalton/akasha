import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const harranisReport = {
  id: "01a0d5f1-f451-73e7-bcea-49210bf0deb0",
  type: "page-type/temper-lore-book",
  slug: "harranis-report",
  title: "Harrani's Report",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1404,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
