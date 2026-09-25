import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yenadarsJournal = {
  id: "01a0d5f4-6f1b-77b2-91be-c93d33fae00a",
  type: "page-type/temper-lore-book",
  slug: "yenadars-journal",
  title: "Yenadar's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1749,
  bookIndex: 67,
  charted: true,
  quest: 4808,
  positions: "jsonl",
} as const satisfies TemperLoreBook
