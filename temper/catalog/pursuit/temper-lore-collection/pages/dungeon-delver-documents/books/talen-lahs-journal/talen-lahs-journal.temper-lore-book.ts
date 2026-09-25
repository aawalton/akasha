import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talenLahsJournal = {
  id: "01a0d60d-708e-7ad3-b175-41199f9f43f0",
  type: "page-type/temper-lore-book",
  slug: "talen-lahs-journal",
  title: "Talen-Lah's Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8474,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
