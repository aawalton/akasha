import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blue = {
  id: "01a0d5f4-3c11-7fc2-a6d9-6af5778c733c",
  type: "page-type/temper-lore-book",
  slug: "blue",
  title: "Blue",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2541,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
