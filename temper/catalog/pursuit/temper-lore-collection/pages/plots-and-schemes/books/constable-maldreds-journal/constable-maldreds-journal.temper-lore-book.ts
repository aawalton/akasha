import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const constableMaldredsJournal = {
  id: "01a0d5f4-c383-7ebe-bada-6ec5d10338f9",
  type: "page-type/temper-lore-book",
  slug: "constable-maldreds-journal",
  title: "Constable Maldred's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1898,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
