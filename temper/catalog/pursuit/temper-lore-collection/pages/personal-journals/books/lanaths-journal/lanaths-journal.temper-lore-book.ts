import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lanathsJournal = {
  id: "01a0d5f4-6f1a-7fd8-8b87-aaf784926590",
  type: "page-type/temper-lore-book",
  slug: "lanaths-journal",
  title: "Lanath's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1066,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
