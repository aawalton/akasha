import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ithisasJournal = {
  id: "01a0d5f4-6f1a-7706-b306-04df30941cdf",
  type: "page-type/temper-lore-book",
  slug: "ithisas-journal",
  title: "Ithisa's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1621,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
