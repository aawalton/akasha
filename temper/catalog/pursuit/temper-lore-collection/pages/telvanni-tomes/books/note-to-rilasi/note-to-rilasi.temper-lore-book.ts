import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToRilasi = {
  id: "01a0d60c-eb9c-77a8-99a4-a5c309c3feb5",
  type: "page-type/temper-lore-book",
  slug: "note-to-rilasi",
  title: "Note to Rilasi",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7514,
  bookIndex: 69,
  charted: true,
  quest: 6998,
  positions: "jsonl",
} as const satisfies TemperLoreBook
