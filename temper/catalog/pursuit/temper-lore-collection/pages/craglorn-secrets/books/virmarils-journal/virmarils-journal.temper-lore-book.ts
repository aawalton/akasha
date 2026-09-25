import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const virmarilsJournal = {
  id: "01a0d5f1-c91b-7c99-be5f-afaee50fa835",
  type: "page-type/temper-lore-book",
  slug: "virmarils-journal",
  title: "Virmaril's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2688,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
