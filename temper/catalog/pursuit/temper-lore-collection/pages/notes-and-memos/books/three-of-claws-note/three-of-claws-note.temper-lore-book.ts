import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const threeOfClawsNote = {
  id: "01a0d5f4-3c13-7283-8569-2a8591c8c234",
  type: "page-type/temper-lore-book",
  slug: "three-of-claws-note",
  title: "Three-of-Claws' Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1325,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
