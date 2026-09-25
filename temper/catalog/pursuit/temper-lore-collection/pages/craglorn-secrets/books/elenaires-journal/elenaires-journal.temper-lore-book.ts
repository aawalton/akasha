import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elenairesJournal = {
  id: "01a0d5f1-c91a-7b69-9534-e8f4e9ee8290",
  type: "page-type/temper-lore-book",
  slug: "elenaires-journal",
  title: "Elenaire's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2559,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
