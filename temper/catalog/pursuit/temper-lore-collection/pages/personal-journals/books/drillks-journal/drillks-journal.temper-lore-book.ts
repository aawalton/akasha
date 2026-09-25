import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drillksJournal = {
  id: "01a0d5f4-6f1a-7dc4-845b-5f7f9cc5bfd7",
  type: "page-type/temper-lore-book",
  slug: "drillks-journal",
  title: "Drillk's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 741,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
