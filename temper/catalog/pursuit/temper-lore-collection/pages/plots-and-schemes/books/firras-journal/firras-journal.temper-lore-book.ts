import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firrasJournal = {
  id: "01a0d5f4-c383-7278-8ae3-8b0fea0f902b",
  type: "page-type/temper-lore-book",
  slug: "firras-journal",
  title: "Firras' Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 448,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
