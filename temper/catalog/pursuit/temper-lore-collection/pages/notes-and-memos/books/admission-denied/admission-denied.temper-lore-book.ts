import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const admissionDenied = {
  id: "01a0d5f4-3c11-7bf5-9726-12407879aebd",
  type: "page-type/temper-lore-book",
  slug: "admission-denied",
  title: "Admission Denied",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1639,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
