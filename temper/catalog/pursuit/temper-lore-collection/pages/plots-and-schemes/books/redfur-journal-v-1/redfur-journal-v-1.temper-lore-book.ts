import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redfurJournalV1 = {
  id: "01a0d5f4-c389-7b0c-9845-1c7533e73519",
  type: "page-type/temper-lore-book",
  slug: "redfur-journal-v-1",
  title: "Redfur Journal, v. 1",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2122,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
