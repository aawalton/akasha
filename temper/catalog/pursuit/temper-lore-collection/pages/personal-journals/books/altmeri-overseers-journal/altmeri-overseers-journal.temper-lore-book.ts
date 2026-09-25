import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const altmeriOverseersJournal = {
  id: "01a0d5f4-6f19-76ab-9541-12fd89a3299b",
  type: "page-type/temper-lore-book",
  slug: "altmeri-overseers-journal",
  title: "Altmeri Overseer's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1050,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
