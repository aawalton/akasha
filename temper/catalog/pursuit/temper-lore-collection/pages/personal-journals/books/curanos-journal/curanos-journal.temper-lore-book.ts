import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const curanosJournal = {
  id: "01a0d5f4-6f1a-7319-9521-05830d25a07f",
  type: "page-type/temper-lore-book",
  slug: "curanos-journal",
  title: "Curano's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1065,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
