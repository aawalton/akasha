import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const watchersReport = {
  id: "01a0d5f6-d68c-77da-9697-b97f88793674",
  type: "page-type/temper-lore-book",
  slug: "watchers-report",
  title: "Watcher's Report",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3015,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
