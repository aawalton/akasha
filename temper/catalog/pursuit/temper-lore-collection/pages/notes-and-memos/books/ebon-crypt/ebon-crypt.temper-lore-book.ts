import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ebonCrypt = {
  id: "01a0d5f4-3c11-7492-8adf-70b6c70de70b",
  type: "page-type/temper-lore-book",
  slug: "ebon-crypt",
  title: "Ebon Crypt",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1292,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
