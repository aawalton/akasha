import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const memoToCaptainDoronil = {
  id: "01a0d5f4-3c12-7c02-81b5-69bc17f267d1",
  type: "page-type/temper-lore-book",
  slug: "memo-to-captain-doronil",
  title: "Memo to Captain Doronil",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 606,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
