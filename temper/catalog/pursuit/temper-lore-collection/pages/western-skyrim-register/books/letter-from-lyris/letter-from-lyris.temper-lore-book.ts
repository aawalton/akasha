import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromLyris = {
  id: "01a0d60b-a361-7abc-b6a7-3679eaf1b6b3",
  type: "page-type/temper-lore-book",
  slug: "letter-from-lyris",
  title: "Letter from Lyris",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6217,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
