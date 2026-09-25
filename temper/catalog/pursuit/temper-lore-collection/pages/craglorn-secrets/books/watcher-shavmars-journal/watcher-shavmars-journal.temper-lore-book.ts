import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const watcherShavmarsJournal = {
  id: "01a0d5f1-c91c-787c-9ffe-d8caededad05",
  type: "page-type/temper-lore-book",
  slug: "watcher-shavmars-journal",
  title: "Watcher Shavmar's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2675,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
