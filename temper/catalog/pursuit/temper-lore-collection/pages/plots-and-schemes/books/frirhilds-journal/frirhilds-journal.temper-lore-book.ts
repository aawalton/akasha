import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frirhildsJournal = {
  id: "01a0d5f4-c388-792f-89dd-ad5299071222",
  type: "page-type/temper-lore-book",
  slug: "frirhilds-journal",
  title: "Frirhild's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1045,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
