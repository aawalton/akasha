import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLittleAlkoshsLog = {
  id: "01a0d5f6-45ae-74b3-8e22-7621a1efab19",
  type: "page-type/temper-lore-book",
  slug: "the-little-alkoshs-log",
  title: "The Little Alkosh's Log",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1560,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
