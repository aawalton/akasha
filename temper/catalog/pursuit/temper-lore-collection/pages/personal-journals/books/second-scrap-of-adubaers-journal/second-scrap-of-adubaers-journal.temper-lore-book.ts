import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secondScrapOfAdubaersJournal = {
  id: "01a0d5f4-6f1b-787b-9f0e-00251c5ccc2c",
  type: "page-type/temper-lore-book",
  slug: "second-scrap-of-adubaers-journal",
  title: "Second Scrap of Adubaer's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1092,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
