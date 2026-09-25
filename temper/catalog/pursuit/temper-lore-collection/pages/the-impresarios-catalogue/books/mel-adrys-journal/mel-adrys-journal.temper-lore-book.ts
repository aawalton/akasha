import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const melAdrysJournal = {
  id: "01a0d60c-18bd-7096-8d63-395dd8785f19",
  type: "page-type/temper-lore-book",
  slug: "mel-adrys-journal",
  title: "Mel Adrys' Journal",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 7358,
  bookIndex: 11,
  charted: false,
} as const satisfies TemperLoreBook
