import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kivsJournal = {
  id: "01a0d60c-75b5-7f33-9872-84d6469a25c7",
  type: "page-type/temper-lore-book",
  slug: "kivs-journal",
  title: "Kiv's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7100,
  charted: true,
  quest: 6789,
  positions: "jsonl",
} as const satisfies TemperLoreBook
