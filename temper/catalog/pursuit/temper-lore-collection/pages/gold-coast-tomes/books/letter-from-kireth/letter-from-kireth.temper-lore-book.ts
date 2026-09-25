import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromKireth = {
  id: "01a0d5f7-73fa-7e1b-b6ba-70b973ca572c",
  type: "page-type/temper-lore-book",
  slug: "letter-from-kireth",
  title: "Letter from Kireth",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3533,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
