import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wolfpackInitiatesNotes = {
  id: "01a0d5f2-253c-7d4c-9d54-87c6b61efb18",
  type: "page-type/temper-lore-book",
  slug: "wolfpack-initiates-notes",
  title: "Wolfpack Initiate's Notes",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1855,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
