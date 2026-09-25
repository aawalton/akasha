import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nikusshasResearchNote1 = {
  id: "01a0d60b-2345-746d-b837-91eff3a30ed7",
  type: "page-type/temper-lore-book",
  slug: "nikusshas-research-note-1",
  title: "Nikussha's Research Note 1",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5385,
  bookIndex: 81,
  charted: true,
  quest: 6302,
  positions: "jsonl",
} as const satisfies TemperLoreBook
