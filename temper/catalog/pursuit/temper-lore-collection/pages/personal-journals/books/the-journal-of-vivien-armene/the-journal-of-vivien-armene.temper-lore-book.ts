import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfVivienArmene = {
  id: "01a0d5f4-6f1b-7ef1-b759-c41a04bb42ce",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-vivien-armene",
  title: "The Journal of Vivien Armene",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2509,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
