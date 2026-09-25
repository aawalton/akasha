import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSourceOfPower = {
  id: "01a0d5f2-509f-73ca-9ce5-6ddb77eee0e5",
  type: "page-type/temper-lore-book",
  slug: "the-source-of-power",
  title: "The Source of Power",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1665,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
