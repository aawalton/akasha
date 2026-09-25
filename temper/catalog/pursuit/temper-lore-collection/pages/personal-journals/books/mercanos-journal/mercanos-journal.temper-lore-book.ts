import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mercanosJournal = {
  id: "01a0d5f4-6f1b-717a-a247-d581b2fc3363",
  type: "page-type/temper-lore-book",
  slug: "mercanos-journal",
  title: "Mercano's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1808,
  bookIndex: 72,
  charted: true,
  quest: 4846,
  positions: "jsonl",
} as const satisfies TemperLoreBook
