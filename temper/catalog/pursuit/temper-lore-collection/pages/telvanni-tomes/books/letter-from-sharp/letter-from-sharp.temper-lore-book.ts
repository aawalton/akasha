import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromSharp = {
  id: "01a0d60c-eb9b-765f-8b25-02fd762b36f1",
  type: "page-type/temper-lore-book",
  slug: "letter-from-sharp",
  title: "Letter from Sharp",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7761,
  bookIndex: 65,
  charted: true,
  quest: 7019,
  positions: "jsonl",
} as const satisfies TemperLoreBook
