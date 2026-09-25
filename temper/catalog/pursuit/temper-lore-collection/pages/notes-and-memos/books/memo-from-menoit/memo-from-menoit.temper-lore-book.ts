import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const memoFromMenoit = {
  id: "01a0d5f4-3c12-7aa0-b8c1-298422e6c856",
  type: "page-type/temper-lore-book",
  slug: "memo-from-menoit",
  title: "Memo from Menoit",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 839,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
