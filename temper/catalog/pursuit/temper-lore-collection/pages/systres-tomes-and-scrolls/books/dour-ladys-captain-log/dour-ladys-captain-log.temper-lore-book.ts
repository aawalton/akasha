import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dourLadysCaptainLog = {
  id: "01a0d60c-75b5-7de4-be36-fcfff7f6d4a4",
  type: "page-type/temper-lore-book",
  slug: "dour-ladys-captain-log",
  title: "Dour Lady's Captain Log",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6944,
  bookIndex: 15,
  charted: true,
  quest: 6762,
  positions: "jsonl",
} as const satisfies TemperLoreBook
