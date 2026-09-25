import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfMargusDerius = {
  id: "01a0d5f4-6f1b-7e23-9ba9-ee70db7441ea",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-margus-derius",
  title: "The Journal of Margus Derius",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 5265,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
