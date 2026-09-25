import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToKingMaxevian = {
  id: "01a0d5f6-d68b-744a-8f20-8e70656d969b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-king-maxevian",
  title: "Letter to King Maxevian",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2700,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
