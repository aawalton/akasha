import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uricantarsJournal = {
  id: "01a0d5f5-1386-70ca-9155-4e38c39eca81",
  type: "page-type/temper-lore-book",
  slug: "uricantars-journal",
  title: "Uricantar's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 522,
  bookIndex: 22,
  charted: true,
  quest: 4220,
  positions: "jsonl",
} as const satisfies TemperLoreBook
