import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const geirmundsOath = {
  id: "01a0d5f6-1c15-7e90-8d45-3535faee415e",
  type: "page-type/temper-lore-book",
  slug: "geirmunds-oath",
  title: "Geirmund's Oath",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1018,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
