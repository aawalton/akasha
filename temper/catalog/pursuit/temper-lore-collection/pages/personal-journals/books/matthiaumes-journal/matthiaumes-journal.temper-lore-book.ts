import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const matthiaumesJournal = {
  id: "01a0d5f4-6f1b-765d-8672-4b4466f807ff",
  type: "page-type/temper-lore-book",
  slug: "matthiaumes-journal",
  title: "Matthiaume's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1977,
  bookIndex: 79,
  charted: true,
  quest: 4923,
  positions: "jsonl",
} as const satisfies TemperLoreBook
