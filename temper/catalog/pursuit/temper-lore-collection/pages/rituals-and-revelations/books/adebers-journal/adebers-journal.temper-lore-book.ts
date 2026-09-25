import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adebersJournal = {
  id: "01a0d5f5-444b-7396-aab7-1b55e4bd1a1a",
  type: "page-type/temper-lore-book",
  slug: "adebers-journal",
  title: "Adeber's Journal",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 4561,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
