import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elphirionsJournal = {
  id: "01a0d5f4-c383-767e-85f9-df01b399476f",
  type: "page-type/temper-lore-book",
  slug: "elphirions-journal",
  title: "Elphirion's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1655,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
