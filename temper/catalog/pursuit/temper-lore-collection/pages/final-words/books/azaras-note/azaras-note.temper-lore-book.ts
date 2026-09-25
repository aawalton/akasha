import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const azarasNote = {
  id: "01a0d5f6-45ad-7c3b-b6eb-cc3fd2419e3b",
  type: "page-type/temper-lore-book",
  slug: "azaras-note",
  title: "Azara's Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1759,
  bookIndex: 48,
  charted: true,
  quest: 4707,
  positions: "jsonl",
} as const satisfies TemperLoreBook
