import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wakingFlameJournal = {
  id: "01a0d60c-40c1-7c9b-8927-0e0c5ba744d4",
  type: "page-type/temper-lore-book",
  slug: "waking-flame-journal",
  title: "Waking Flame Journal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6755,
  bookIndex: 17,
  charted: true,
  quest: 6696,
  positions: "jsonl",
} as const satisfies TemperLoreBook
