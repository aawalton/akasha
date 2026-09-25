import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfTsonaEiPartTwo = {
  id: "01a0d5f4-6f1a-7993-8ea4-5c10cea153ee",
  type: "page-type/temper-lore-book",
  slug: "journal-of-tsona-ei-part-two",
  title: "Journal of Tsona-Ei, Part Two",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 919,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
