import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aServantsTale = {
  id: "01a0d60c-eb9a-7389-abc5-a1cd52583d0e",
  type: "page-type/temper-lore-book",
  slug: "a-servants-tale",
  title: "A Servant's Tale",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7765,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
