import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aberrantWelkyndStones = {
  id: "01a0d5f5-1383-7de2-9399-6243d848f2fe",
  type: "page-type/temper-lore-book",
  slug: "aberrant-welkynd-stones",
  title: "Aberrant Welkynd Stones",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1042,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
