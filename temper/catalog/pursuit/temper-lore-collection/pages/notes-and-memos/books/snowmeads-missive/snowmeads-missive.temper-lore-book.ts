import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const snowmeadsMissive = {
  id: "01a0d5f4-3c13-7257-9cb5-4e53177c5f9b",
  type: "page-type/temper-lore-book",
  slug: "snowmeads-missive",
  title: "Snowmead's Missive",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1280,
  bookIndex: 29,
  charted: true,
  quest: 4126,
  positions: "jsonl",
} as const satisfies TemperLoreBook
