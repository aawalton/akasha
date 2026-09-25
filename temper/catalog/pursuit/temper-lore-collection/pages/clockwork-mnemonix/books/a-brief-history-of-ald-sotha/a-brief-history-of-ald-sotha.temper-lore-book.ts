import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aBriefHistoryOfAldSotha = {
  id: "01a0d60a-a212-7087-a2c0-70150ee75f47",
  type: "page-type/temper-lore-book",
  slug: "a-brief-history-of-ald-sotha",
  title: "A Brief History of Ald Sotha",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4559,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
