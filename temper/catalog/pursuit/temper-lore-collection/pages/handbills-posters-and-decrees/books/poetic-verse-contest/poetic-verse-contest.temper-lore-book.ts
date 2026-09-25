import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const poeticVerseContest = {
  id: "01a0d5f2-83a3-7d6a-a2ba-9a2ebe5c2c07",
  type: "page-type/temper-lore-book",
  slug: "poetic-verse-contest",
  title: "Poetic Verse Contest!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1031,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
