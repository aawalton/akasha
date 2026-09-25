import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const niborwensJournal = {
  id: "01a0d60d-708e-7b79-b650-49a1b423a126",
  type: "page-type/temper-lore-book",
  slug: "niborwens-journal",
  title: "Niborwen's Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7812,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
