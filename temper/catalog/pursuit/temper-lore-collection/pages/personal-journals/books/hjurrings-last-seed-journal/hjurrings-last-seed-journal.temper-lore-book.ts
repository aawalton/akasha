import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hjurringsLastSeedJournal = {
  id: "01a0d5f4-6f1a-7573-8f8f-101c8a8c8e96",
  type: "page-type/temper-lore-book",
  slug: "hjurrings-last-seed-journal",
  title: "Hjurring's Last Seed Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 847,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
