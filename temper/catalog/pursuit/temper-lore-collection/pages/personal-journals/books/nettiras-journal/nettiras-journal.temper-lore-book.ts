import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nettirasJournal = {
  id: "01a0d5f4-6f1b-7af9-b517-ec09083ca037",
  type: "page-type/temper-lore-book",
  slug: "nettiras-journal",
  title: "Nettira's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1758,
  bookIndex: 69,
  charted: true,
  quest: 4814,
  positions: "jsonl",
} as const satisfies TemperLoreBook
