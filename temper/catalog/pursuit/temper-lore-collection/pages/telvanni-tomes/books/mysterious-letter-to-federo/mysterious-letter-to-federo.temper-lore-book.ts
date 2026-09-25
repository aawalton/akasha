import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysteriousLetterToFedero = {
  id: "01a0d60c-eb9c-723a-8e48-396cdc194312",
  type: "page-type/temper-lore-book",
  slug: "mysterious-letter-to-federo",
  title: "Mysterious Letter to Federo",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7688,
  bookIndex: 83,
  charted: true,
  quest: 7018,
  positions: "jsonl",
} as const satisfies TemperLoreBook
