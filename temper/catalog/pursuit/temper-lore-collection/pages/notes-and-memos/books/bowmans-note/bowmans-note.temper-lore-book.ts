import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bowmansNote = {
  id: "01a0d5f4-3c11-7d53-adae-766e88125375",
  type: "page-type/temper-lore-book",
  slug: "bowmans-note",
  title: "Bowman's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2829,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
