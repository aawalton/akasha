import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfTsonaEiPartOne = {
  id: "01a0d5f4-6f1a-7597-8bf9-527cf5045a69",
  type: "page-type/temper-lore-book",
  slug: "journal-of-tsona-ei-part-one",
  title: "Journal of Tsona-Ei, Part One",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 918,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
