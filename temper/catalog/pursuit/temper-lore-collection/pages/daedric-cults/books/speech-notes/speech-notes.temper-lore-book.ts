import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const speechNotes = {
  id: "01a0d5f2-253b-7475-897b-f123344321da",
  type: "page-type/temper-lore-book",
  slug: "speech-notes",
  title: "Speech Notes",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 854,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
