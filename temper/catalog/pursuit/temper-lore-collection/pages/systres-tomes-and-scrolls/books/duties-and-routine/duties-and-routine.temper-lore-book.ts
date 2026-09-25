import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dutiesAndRoutine = {
  id: "01a0d60c-75b5-724c-8807-23b7bd97b1cb",
  type: "page-type/temper-lore-book",
  slug: "duties-and-routine",
  title: "Duties and Routine",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7133,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
