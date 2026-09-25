import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldDrublogJournal = {
  id: "01a0d5f4-6f1b-7eeb-ba0c-f211e72d0692",
  type: "page-type/temper-lore-book",
  slug: "old-drublog-journal",
  title: "Old Drublog Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 395,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
