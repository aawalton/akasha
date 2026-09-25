import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const miruinsJournal = {
  id: "01a0d5f4-6f1b-77cb-8ef0-88a79232ff1c",
  type: "page-type/temper-lore-book",
  slug: "miruins-journal",
  title: "Miruin's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1789,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
