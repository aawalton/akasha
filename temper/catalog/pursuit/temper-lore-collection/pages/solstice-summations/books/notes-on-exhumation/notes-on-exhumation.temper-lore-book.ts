import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnExhumation = {
  id: "01a0d60d-ff6a-7e26-9a3b-3f36d1b7da94",
  type: "page-type/temper-lore-book",
  slug: "notes-on-exhumation",
  title: "Notes on Exhumation",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8482,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
