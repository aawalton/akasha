import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pibihasNote = {
  id: "01a0d60c-40c0-7474-9154-78752f5c4fc4",
  type: "page-type/temper-lore-book",
  slug: "pibihas-note",
  title: "Pibiha's Note",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6743,
  bookIndex: 23,
  charted: true,
  quest: 6698,
  positions: "jsonl",
} as const satisfies TemperLoreBook
