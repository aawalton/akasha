import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const delvesDeeplysNote = {
  id: "01a0d5f4-3c11-7b84-9e7c-7089ddd957af",
  type: "page-type/temper-lore-book",
  slug: "delves-deeplys-note",
  title: "Delves-Deeply's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 832,
  bookIndex: 14,
  charted: true,
  quest: 4327,
  positions: "jsonl",
} as const satisfies TemperLoreBook
