import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thatOfVoid = {
  id: "01a0d5f6-a29a-7d43-b382-7fe786f662df",
  type: "page-type/temper-lore-book",
  slug: "that-of-void",
  title: "That of Void",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5362,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
