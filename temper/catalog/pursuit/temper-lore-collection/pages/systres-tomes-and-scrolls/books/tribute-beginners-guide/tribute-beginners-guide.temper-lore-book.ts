import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tributeBeginnersGuide = {
  id: "01a0d60c-75b6-7eb1-9cf4-2a6a9f79e8fc",
  type: "page-type/temper-lore-book",
  slug: "tribute-beginners-guide",
  title: "Tribute Beginner's Guide",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7274,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
