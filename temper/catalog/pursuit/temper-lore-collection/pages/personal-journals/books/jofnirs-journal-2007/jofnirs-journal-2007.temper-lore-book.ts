import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jofnirsJournal2007 = {
  id: "01a0d5f4-6f1a-73ea-9fbb-534a95e24d66",
  type: "page-type/temper-lore-book",
  slug: "jofnirs-journal-2007",
  title: "Jofnir's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2007,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
