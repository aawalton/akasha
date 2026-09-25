import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firuinsJournal = {
  id: "01a0d5f4-6f1a-7237-85d4-6304725b182f",
  type: "page-type/temper-lore-book",
  slug: "firuins-journal",
  title: "Firuin's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1070,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
