import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWatchersPledge = {
  id: "01a0d5f6-d68c-7465-88c8-dc76b2479df6",
  type: "page-type/temper-lore-book",
  slug: "the-watchers-pledge",
  title: "The Watcher's Pledge",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3014,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
