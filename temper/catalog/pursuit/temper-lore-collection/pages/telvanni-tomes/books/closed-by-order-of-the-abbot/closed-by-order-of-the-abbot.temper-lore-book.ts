import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const closedByOrderOfTheAbbot = {
  id: "01a0d60c-eb9b-7207-b5f1-c1f61278228d",
  type: "page-type/temper-lore-book",
  slug: "closed-by-order-of-the-abbot",
  title: "Closed By Order of the Abbot",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7745,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
