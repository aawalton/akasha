import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const discardedDiary = {
  id: "01a0d60c-40bf-7311-a1ba-2ca1ae4b6814",
  type: "page-type/temper-lore-book",
  slug: "discarded-diary",
  title: "Discarded Diary",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6803,
  bookIndex: 19,
  charted: true,
  quest: 6696,
  positions: "jsonl",
} as const satisfies TemperLoreBook
