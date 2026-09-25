import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const initiatesFear = {
  id: "01a0d60d-708d-732d-9604-e14c76c8d537",
  type: "page-type/temper-lore-book",
  slug: "initiates-fear",
  title: "Initiate's Fear",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7811,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
