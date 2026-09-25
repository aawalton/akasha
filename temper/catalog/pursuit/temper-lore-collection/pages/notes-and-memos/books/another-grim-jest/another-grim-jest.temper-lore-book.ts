import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anotherGrimJest = {
  id: "01a0d5f4-3c11-7271-9c81-5570e1080e12",
  type: "page-type/temper-lore-book",
  slug: "another-grim-jest",
  title: "Another Grim Jest",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 902,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
