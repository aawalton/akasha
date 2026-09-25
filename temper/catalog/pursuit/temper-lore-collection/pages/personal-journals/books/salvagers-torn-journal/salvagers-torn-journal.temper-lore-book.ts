import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const salvagersTornJournal = {
  id: "01a0d5f4-6f1b-7ff5-bd74-de91bb93f1c1",
  type: "page-type/temper-lore-book",
  slug: "salvagers-torn-journal",
  title: "Salvager's Torn Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1580,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
