import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const neramosJournalPage1 = {
  id: "01a0d5f6-d68b-7b27-9b70-951cfb14afc0",
  type: "page-type/temper-lore-book",
  slug: "neramos-journal-page-1",
  title: "Neramo's Journal, Page 1",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2764,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
