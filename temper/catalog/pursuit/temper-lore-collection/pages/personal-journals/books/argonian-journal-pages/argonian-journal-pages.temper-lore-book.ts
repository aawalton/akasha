import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const argonianJournalPages = {
  id: "01a0d5f4-6f19-7ecd-8d73-2c5507588e60",
  type: "page-type/temper-lore-book",
  slug: "argonian-journal-pages",
  title: "Argonian Journal Pages",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 148,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
