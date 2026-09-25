import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gorlarsJournalPartOne = {
  id: "01a0d5f6-d68a-7297-a88e-9157a3c4363a",
  type: "page-type/temper-lore-book",
  slug: "gorlars-journal-part-one",
  title: "Gorlar's Journal, Part One",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3017,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
