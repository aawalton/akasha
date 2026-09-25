import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const caeciliusJournal = {
  id: "01a0d5f1-c919-74e9-bc3d-c1a048fa24bc",
  type: "page-type/temper-lore-book",
  slug: "caecilius-journal",
  title: "Caecilius' Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2200,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
