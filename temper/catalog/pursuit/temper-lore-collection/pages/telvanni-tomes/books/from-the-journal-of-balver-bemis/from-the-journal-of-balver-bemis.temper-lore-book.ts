import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fromTheJournalOfBalverBemis = {
  id: "01a0d60c-eb9b-77fd-a3b0-abce3d40aff8",
  type: "page-type/temper-lore-book",
  slug: "from-the-journal-of-balver-bemis",
  title: "From the Journal of Balver Bemis",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7635,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
