import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theImpresariosCatalogue = {
  id: "01a0d60c-18bd-7c29-b9b9-632d9b7e68f4",
  type: "page-type/temper-lore-book",
  slug: "the-impresarios-catalogue",
  title: "The Impresario's Catalogue",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 7751,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
