import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wearThemDown = {
  id: "01a0d5f4-3c13-7ecd-9eb4-57e3450911e0",
  type: "page-type/temper-lore-book",
  slug: "wear-them-down",
  title: "Wear Them Down",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2076,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
