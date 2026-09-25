import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fascinatingRelics = {
  id: "01a0d5f4-3c11-7299-b6b0-8d0bb21e550b",
  type: "page-type/temper-lore-book",
  slug: "fascinating-relics",
  title: "Fascinating Relics",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1847,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
