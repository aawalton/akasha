import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const regardingYourContract = {
  id: "01a0d5f7-73fa-7260-a35f-b046bb2fa043",
  type: "page-type/temper-lore-book",
  slug: "regarding-your-contract",
  title: "Regarding Your Contract",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3687,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
