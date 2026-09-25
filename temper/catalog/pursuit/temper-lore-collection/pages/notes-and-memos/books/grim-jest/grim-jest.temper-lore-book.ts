import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grimJest = {
  id: "01a0d5f4-3c11-7aea-9242-a4351a67a3f1",
  type: "page-type/temper-lore-book",
  slug: "grim-jest",
  title: "Grim Jest",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 901,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
