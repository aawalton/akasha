import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToArida = {
  id: "01a0d5f4-3c12-7d45-942c-d4fbd7ab7e94",
  type: "page-type/temper-lore-book",
  slug: "note-to-arida",
  title: "Note to Arida",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1653,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
