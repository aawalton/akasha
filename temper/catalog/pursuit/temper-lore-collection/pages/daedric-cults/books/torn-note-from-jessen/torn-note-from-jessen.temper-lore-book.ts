import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tornNoteFromJessen = {
  id: "01a0d5f2-253c-7098-a383-38559b7b71a1",
  type: "page-type/temper-lore-book",
  slug: "torn-note-from-jessen",
  title: "Torn Note from Jessen",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 990,
  bookIndex: 38,
  charted: true,
  quest: 3856,
  positions: "jsonl",
} as const satisfies TemperLoreBook
