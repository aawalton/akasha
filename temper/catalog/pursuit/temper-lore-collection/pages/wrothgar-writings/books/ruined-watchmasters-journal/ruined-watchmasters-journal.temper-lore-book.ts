import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ruinedWatchmastersJournal = {
  id: "01a0d5f6-d68b-7bf9-93a9-9633a10b5b4e",
  type: "page-type/temper-lore-book",
  slug: "ruined-watchmasters-journal",
  title: "Ruined Watchmaster's Journal",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3016,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
