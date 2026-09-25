import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khorshinasJournal = {
  id: "01a0d5f4-6f1a-7c50-8a5d-500c4c832726",
  type: "page-type/temper-lore-book",
  slug: "khorshinas-journal",
  title: "Khorshina's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2989,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
