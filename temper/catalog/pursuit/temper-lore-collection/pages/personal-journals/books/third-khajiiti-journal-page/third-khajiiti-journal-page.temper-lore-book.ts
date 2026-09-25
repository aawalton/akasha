import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thirdKhajiitiJournalPage = {
  id: "01a0d5f4-6f1b-7d9d-8cd8-974d55833e18",
  type: "page-type/temper-lore-book",
  slug: "third-khajiiti-journal-page",
  title: "Third Khajiiti Journal Page",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1863,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
