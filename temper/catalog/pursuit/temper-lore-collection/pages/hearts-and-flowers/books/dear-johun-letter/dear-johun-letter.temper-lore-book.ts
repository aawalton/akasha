import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dearJohunLetter = {
  id: "01a0d5f2-af6f-7744-8233-70dd9327e490",
  type: "page-type/temper-lore-book",
  slug: "dear-johun-letter",
  title: "Dear Johun Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 407,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
