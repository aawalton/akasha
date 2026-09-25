import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const urgentLetter = {
  id: "01a0d5f8-02f9-78ef-b267-07833059301b",
  type: "page-type/temper-lore-book",
  slug: "urgent-letter",
  title: "Urgent Letter",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3716,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
