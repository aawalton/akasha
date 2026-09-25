import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lifeInTheCamonnaTong = {
  id: "01a0d60c-eb9b-799f-b781-fc240669d320",
  type: "page-type/temper-lore-book",
  slug: "life-in-the-camonna-tong",
  title: "Life in the Camonna Tong",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7433,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
