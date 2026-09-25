import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dirtyAbandonedJournal = {
  id: "01a0d60e-45b2-7f4b-b9e3-0a451b711bb4",
  type: "page-type/temper-lore-book",
  slug: "dirty-abandoned-journal",
  title: "Dirty Abandoned Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8563,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
