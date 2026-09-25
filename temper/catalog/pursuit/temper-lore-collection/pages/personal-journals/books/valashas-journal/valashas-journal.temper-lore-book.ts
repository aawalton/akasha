import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const valashasJournal = {
  id: "01a0d5f4-6f1b-70e5-87d6-65dff9c7d689",
  type: "page-type/temper-lore-book",
  slug: "valashas-journal",
  title: "Valasha's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 451,
  bookIndex: 17,
  charted: true,
  quest: 3858,
  positions: "jsonl",
} as const satisfies TemperLoreBook
