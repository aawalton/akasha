import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfArrai = {
  id: "01a0d5f4-6f1a-7989-bbaf-3ddbcbe5ea30",
  type: "page-type/temper-lore-book",
  slug: "journal-of-arrai",
  title: "Journal of Arrai",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 580,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
