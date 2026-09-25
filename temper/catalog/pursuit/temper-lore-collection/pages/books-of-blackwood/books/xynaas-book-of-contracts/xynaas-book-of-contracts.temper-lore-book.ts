import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const xynaasBookOfContracts = {
  id: "01a0d60b-fdb1-7f93-a019-0cd39fd60aa3",
  type: "page-type/temper-lore-book",
  slug: "xynaas-book-of-contracts",
  title: "Xynaa's Book of Contracts",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6522,
  bookIndex: 22,
  charted: true,
  quest: 6617,
  positions: "jsonl",
} as const satisfies TemperLoreBook
