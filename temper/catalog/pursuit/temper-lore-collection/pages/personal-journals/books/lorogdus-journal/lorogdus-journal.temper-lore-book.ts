import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lorogdusJournal = {
  id: "01a0d5f4-6f1a-70de-baea-6be91883031a",
  type: "page-type/temper-lore-book",
  slug: "lorogdus-journal",
  title: "Lorogdu's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 108,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
