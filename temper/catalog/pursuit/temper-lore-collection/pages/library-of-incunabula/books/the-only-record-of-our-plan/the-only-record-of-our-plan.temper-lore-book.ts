import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOnlyRecordOfOurPlan = {
  id: "01a0d5f8-02f9-7b14-88cf-e6ab41e94221",
  type: "page-type/temper-lore-book",
  slug: "the-only-record-of-our-plan",
  title: "The Only Record of Our Plan",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7187,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
