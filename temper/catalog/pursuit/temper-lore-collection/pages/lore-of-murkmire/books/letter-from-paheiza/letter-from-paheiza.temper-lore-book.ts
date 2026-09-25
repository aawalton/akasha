import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromPaheiza = {
  id: "01a0d5f6-a29a-7226-98d0-e329f3278676",
  type: "page-type/temper-lore-book",
  slug: "letter-from-paheiza",
  title: "Letter from Paheiza",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5276,
  charted: true,
  quest: 6277,
  positions: "jsonl",
} as const satisfies TemperLoreBook
