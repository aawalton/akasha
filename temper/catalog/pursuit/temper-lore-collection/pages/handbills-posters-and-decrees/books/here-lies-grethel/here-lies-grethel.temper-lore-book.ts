import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hereLiesGrethel = {
  id: "01a0d5f2-83a2-7f0e-82ce-5d7322385a2f",
  type: "page-type/temper-lore-book",
  slug: "here-lies-grethel",
  title: "Here Lies Grethel",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2535,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
