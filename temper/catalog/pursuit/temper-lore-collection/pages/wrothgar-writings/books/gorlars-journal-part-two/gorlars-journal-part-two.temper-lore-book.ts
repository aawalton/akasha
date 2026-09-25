import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gorlarsJournalPartTwo = {
  id: "01a0d5f6-d68a-724c-a50b-b8739ef818e9",
  type: "page-type/temper-lore-book",
  slug: "gorlars-journal-part-two",
  title: "Gorlar's Journal, Part Two",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3018,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
