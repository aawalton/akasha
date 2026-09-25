import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tenareisContract = {
  id: "01a0d60b-fdb1-79d4-a1b0-61b4da27f7f1",
  type: "page-type/temper-lore-book",
  slug: "tenareis-contract",
  title: "Tenarei's Contract",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6449,
  bookIndex: 20,
  charted: true,
  quest: 6626,
  positions: "jsonl",
} as const satisfies TemperLoreBook
