import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const borzulsSuicideNote = {
  id: "01a0d5f6-45ad-74d0-ad98-ef39f9ceaa77",
  type: "page-type/temper-lore-book",
  slug: "borzuls-suicide-note",
  title: "Borzul's Suicide Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1008,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
