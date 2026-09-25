import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const malkhestsJournal = {
  id: "01a0d60d-708e-7fe2-8dbb-91aa9171fdb8",
  type: "page-type/temper-lore-book",
  slug: "malkhests-journal",
  title: "Malkhest's Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7766,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
