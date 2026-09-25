import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ascendantOrderNote = {
  id: "01a0d60c-18bc-7f05-8233-7409da45f877",
  type: "page-type/temper-lore-book",
  slug: "ascendant-order-note",
  title: "Ascendant Order Note",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 7096,
  bookIndex: 6,
  charted: true,
  quest: 6751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
