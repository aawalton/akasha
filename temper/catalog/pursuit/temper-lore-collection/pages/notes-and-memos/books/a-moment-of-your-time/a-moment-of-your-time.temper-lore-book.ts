import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aMomentOfYourTime = {
  id: "01a0d5f4-3c10-7f0e-b52a-ea6aa0ae9727",
  type: "page-type/temper-lore-book",
  slug: "a-moment-of-your-time",
  title: "A Moment of Your Time?",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1592,
  bookIndex: 48,
  charted: true,
  quest: 4748,
  positions: "jsonl",
} as const satisfies TemperLoreBook
