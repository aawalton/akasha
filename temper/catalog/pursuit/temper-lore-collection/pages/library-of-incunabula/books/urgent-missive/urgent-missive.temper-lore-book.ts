import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const urgentMissive = {
  id: "01a0d5f8-02f9-70ba-8120-fcf036f61f06",
  type: "page-type/temper-lore-book",
  slug: "urgent-missive",
  title: "Urgent Missive",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4627,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
