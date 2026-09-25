import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nonStandardTechniques = {
  id: "01a0d5f4-3c12-7a23-98f5-0967bc8b2436",
  type: "page-type/temper-lore-book",
  slug: "non-standard-techniques",
  title: "Non-Standard Techniques",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2211,
  bookIndex: 88,
  charted: true,
  quest: 5038,
  positions: "jsonl",
} as const satisfies TemperLoreBook
