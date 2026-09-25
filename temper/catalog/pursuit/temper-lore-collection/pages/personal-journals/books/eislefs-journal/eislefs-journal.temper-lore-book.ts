import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eislefsJournal = {
  id: "01a0d5f4-6f1a-721c-9e44-c30ddfa3f107",
  type: "page-type/temper-lore-book",
  slug: "eislefs-journal",
  title: "Eislef's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 711,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
