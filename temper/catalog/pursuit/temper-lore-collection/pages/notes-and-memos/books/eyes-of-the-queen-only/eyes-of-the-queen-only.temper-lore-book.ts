import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eyesOfTheQueenOnly = {
  id: "01a0d5f4-3c11-743d-a4bc-1ee0b115b624",
  type: "page-type/temper-lore-book",
  slug: "eyes-of-the-queen-only",
  title: "Eyes of the Queen Only",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2105,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
