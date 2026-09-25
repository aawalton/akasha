import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const graccusJournalVolumeI = {
  id: "01a0d5f2-253a-78d3-b255-918e1470441a",
  type: "page-type/temper-lore-book",
  slug: "graccus-journal-volume-i",
  title: "Graccus' Journal, Volume I",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1611,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
