import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const torchbugs = {
  id: "01a0d5f4-3c13-7b49-a9c5-21a2e48902d2",
  type: "page-type/temper-lore-book",
  slug: "torchbugs",
  title: "Torchbugs",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2410,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
