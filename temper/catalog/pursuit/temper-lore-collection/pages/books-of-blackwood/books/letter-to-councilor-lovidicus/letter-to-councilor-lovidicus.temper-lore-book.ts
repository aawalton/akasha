import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCouncilorLovidicus = {
  id: "01a0d60b-fdb0-75f2-a179-86855a79e5ae",
  type: "page-type/temper-lore-book",
  slug: "letter-to-councilor-lovidicus",
  title: "Letter to Councilor Lovidicus",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6671,
  bookIndex: 9,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
