import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rulantarilsNotes = {
  id: "01a0d5f4-3c13-7d69-9c22-a64d2dcbb4f1",
  type: "page-type/temper-lore-book",
  slug: "rulantarils-notes",
  title: "Rulantaril's Notes",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 80,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
