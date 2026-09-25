import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redfurJournalV2 = {
  id: "01a0d5f4-c389-79a9-8b16-aebc50195b61",
  type: "page-type/temper-lore-book",
  slug: "redfur-journal-v-2",
  title: "Redfur Journal, v. 2",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2123,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
