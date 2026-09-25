import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfHabbertUnsinett = {
  id: "01a0d5f4-6f1a-78f0-924a-fae72ea565e6",
  type: "page-type/temper-lore-book",
  slug: "journal-of-habbert-unsinett",
  title: "Journal of Habbert Unsinett",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1413,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
