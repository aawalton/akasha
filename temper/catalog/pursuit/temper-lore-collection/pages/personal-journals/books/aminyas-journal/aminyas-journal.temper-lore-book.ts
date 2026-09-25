import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aminyasJournal = {
  id: "01a0d5f4-6f19-7990-85b1-b5c7954e9fe6",
  type: "page-type/temper-lore-book",
  slug: "aminyas-journal",
  title: "Aminyas' Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2041,
  bookIndex: 83,
  charted: true,
  quest: 4979,
  positions: "jsonl",
} as const satisfies TemperLoreBook
