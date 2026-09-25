import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lumberCampJournal1 = {
  id: "01a0d60d-4aaf-719f-bfde-f03f00eb76d4",
  type: "page-type/temper-lore-book",
  slug: "lumber-camp-journal-1",
  title: "Lumber Camp Journal 1",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8016,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
