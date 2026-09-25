import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const discardedJournal = {
  id: "01a0d5f4-6f1a-7abe-910e-d174a5bb57fa",
  type: "page-type/temper-lore-book",
  slug: "discarded-journal",
  title: "Discarded Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 4029,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
