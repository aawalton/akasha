import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const albusJournal = {
  id: "01a0d5f4-6f19-7896-916d-b365e251610a",
  type: "page-type/temper-lore-book",
  slug: "albus-journal",
  title: "Albus' Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 750,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
