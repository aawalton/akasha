import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gabrielleBenelesJournal = {
  id: "01a0d5f4-6f1a-7b4e-9c77-d197fd449a83",
  type: "page-type/temper-lore-book",
  slug: "gabrielle-beneles-journal",
  title: "Gabrielle Benele's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 997,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
