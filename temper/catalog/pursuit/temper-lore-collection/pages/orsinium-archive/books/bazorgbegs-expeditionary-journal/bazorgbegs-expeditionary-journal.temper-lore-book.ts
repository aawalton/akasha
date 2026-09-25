import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bazorgbegsExpeditionaryJournal = {
  id: "01a0d5f7-160b-77f3-bc4e-69f98f6e9f6d",
  type: "page-type/temper-lore-book",
  slug: "bazorgbegs-expeditionary-journal",
  title: "Bazorgbeg's Expeditionary Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3157,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
