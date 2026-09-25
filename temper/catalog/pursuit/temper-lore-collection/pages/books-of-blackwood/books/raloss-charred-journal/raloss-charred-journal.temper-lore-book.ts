import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ralossCharredJournal = {
  id: "01a0d60b-fdb0-7047-97b3-2c2baf447377",
  type: "page-type/temper-lore-book",
  slug: "raloss-charred-journal",
  title: "Ralos's Charred Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6454,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
