import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greatCathedralClosed = {
  id: "01a0d5f7-73fa-70f2-80c1-ed7c985c27fb",
  type: "page-type/temper-lore-book",
  slug: "great-cathedral-closed",
  title: "Great Cathedral Closed!",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3710,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
