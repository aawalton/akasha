import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromRakhad = {
  id: "01a0d5f1-f451-772c-b28f-c954a2bf04c4",
  type: "page-type/temper-lore-book",
  slug: "letter-from-rakhad",
  title: "Letter from Rakhad",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1097,
  bookIndex: 32,
  charted: true,
  quest: 4484,
  positions: "jsonl",
} as const satisfies TemperLoreBook
