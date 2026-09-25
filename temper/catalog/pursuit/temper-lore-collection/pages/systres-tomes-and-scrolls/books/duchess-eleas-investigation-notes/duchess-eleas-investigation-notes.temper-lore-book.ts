import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const duchessEleasInvestigationNotes = {
  id: "01a0d60c-75b5-7bf2-be1c-d701ff6f9831",
  type: "page-type/temper-lore-book",
  slug: "duchess-eleas-investigation-notes",
  title: "Duchess Elea's Investigation Notes",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7013,
  bookIndex: 26,
  charted: true,
  quest: 6753,
  positions: "jsonl",
} as const satisfies TemperLoreBook
