import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iSuspectDuplicity = {
  id: "01a0d5f2-509f-75b3-8c3b-897ea5efe07f",
  type: "page-type/temper-lore-book",
  slug: "i-suspect-duplicity",
  title: "I Suspect Duplicity",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2216,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
