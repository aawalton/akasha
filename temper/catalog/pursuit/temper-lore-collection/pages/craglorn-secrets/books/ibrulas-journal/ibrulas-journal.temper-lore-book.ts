import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ibrulasJournal = {
  id: "01a0d5f1-c91a-7ace-b8e9-112bb64b0179",
  type: "page-type/temper-lore-book",
  slug: "ibrulas-journal",
  title: "Ibrula's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2393,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
