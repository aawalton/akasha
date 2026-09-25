import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gamesOfTheNetch = {
  id: "01a0d60d-9a63-752f-b642-ddb6909f995b",
  type: "page-type/temper-lore-book",
  slug: "games-of-the-netch",
  title: "Games of the Netch",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8073,
  bookIndex: 60,
  charted: true,
  quest: 7204,
  positions: "jsonl",
} as const satisfies TemperLoreBook
