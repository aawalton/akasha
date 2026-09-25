import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfDarienGautier = {
  id: "01a0d5f4-6f1b-78e4-9f7a-a9a5c98c791e",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-darien-gautier",
  title: "The Journal of Darien Gautier",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1269,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
