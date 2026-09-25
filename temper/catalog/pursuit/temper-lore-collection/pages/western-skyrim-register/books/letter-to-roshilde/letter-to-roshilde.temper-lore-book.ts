import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToRoshilde = {
  id: "01a0d60b-a361-7a2e-81ac-95fe2473ceee",
  type: "page-type/temper-lore-book",
  slug: "letter-to-roshilde",
  title: "Letter to Roshilde",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6040,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
