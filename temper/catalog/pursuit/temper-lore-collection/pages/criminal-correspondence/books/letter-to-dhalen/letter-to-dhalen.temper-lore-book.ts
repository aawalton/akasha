import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDhalen = {
  id: "01a0d5f1-f451-70c1-a4f7-3e92db0999a0",
  type: "page-type/temper-lore-book",
  slug: "letter-to-dhalen",
  title: "Letter to Dhalen",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 500,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
