import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secondKhajiitiJournalPage = {
  id: "01a0d5f4-6f1b-7c42-baa1-8cedeb570446",
  type: "page-type/temper-lore-book",
  slug: "second-khajiiti-journal-page",
  title: "Second Khajiiti Journal Page",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1862,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
