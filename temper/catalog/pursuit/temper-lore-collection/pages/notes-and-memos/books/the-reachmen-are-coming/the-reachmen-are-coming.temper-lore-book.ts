import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theReachmenAreComing = {
  id: "01a0d5f4-3c13-7faa-a8b7-5fcf54ae91e1",
  type: "page-type/temper-lore-book",
  slug: "the-reachmen-are-coming",
  title: "The Reachmen are Coming!",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1958,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
