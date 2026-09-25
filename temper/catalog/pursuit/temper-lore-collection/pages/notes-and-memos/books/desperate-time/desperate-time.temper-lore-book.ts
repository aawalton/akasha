import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const desperateTime = {
  id: "01a0d5f4-3c11-72b6-846e-796bc962588f",
  type: "page-type/temper-lore-book",
  slug: "desperate-time",
  title: "Desperate Time",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1542,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
