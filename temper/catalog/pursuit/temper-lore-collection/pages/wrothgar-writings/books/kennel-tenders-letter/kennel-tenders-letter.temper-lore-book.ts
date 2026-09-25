import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kennelTendersLetter = {
  id: "01a0d5f6-d68a-7193-9438-1e68cd988b73",
  type: "page-type/temper-lore-book",
  slug: "kennel-tenders-letter",
  title: "Kennel Tender's Letter",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2761,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
