import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shalansNote = {
  id: "01a0d5f4-3c13-704f-ab3c-064d8abc961a",
  type: "page-type/temper-lore-book",
  slug: "shalans-note",
  title: "Shalan's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2328,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
