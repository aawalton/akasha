import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noticeHallOfTheDead = {
  id: "01a0d5f2-83a2-7639-bc8f-71cc71ff9e93",
  type: "page-type/temper-lore-book",
  slug: "notice-hall-of-the-dead",
  title: "Notice: Hall of the Dead",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 773,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
