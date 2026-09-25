import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pageFromMendersJournal = {
  id: "01a0d60c-75b6-76ca-b334-e6d046cbe2bf",
  type: "page-type/temper-lore-book",
  slug: "page-from-menders-journal",
  title: "Page from Mender's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7213,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
