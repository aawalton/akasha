import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dresMessage = {
  id: "01a0d60c-eb9b-7ec4-8912-48b2db83aefa",
  type: "page-type/temper-lore-book",
  slug: "dres-message",
  title: "Dres Message",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7625,
  bookIndex: 27,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
