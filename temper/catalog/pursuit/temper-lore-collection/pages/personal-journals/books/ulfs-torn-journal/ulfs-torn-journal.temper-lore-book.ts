import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ulfsTornJournal = {
  id: "01a0d5f4-6f1b-7f25-bc47-887cb45785bf",
  type: "page-type/temper-lore-book",
  slug: "ulfs-torn-journal",
  title: "Ulf's Torn Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2198,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
