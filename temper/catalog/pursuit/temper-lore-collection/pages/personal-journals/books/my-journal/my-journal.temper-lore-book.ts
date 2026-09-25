import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myJournal = {
  id: "01a0d5f4-6f1b-7ce8-bdac-cdbbc2a04768",
  type: "page-type/temper-lore-book",
  slug: "my-journal",
  title: "My Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 140,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
