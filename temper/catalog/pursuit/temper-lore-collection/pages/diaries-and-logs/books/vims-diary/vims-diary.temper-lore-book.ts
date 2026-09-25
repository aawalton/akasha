import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vimsDiary = {
  id: "01a0d5f2-509f-75be-bfcb-f27e720a5f16",
  type: "page-type/temper-lore-book",
  slug: "vims-diary",
  title: "Vim's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 845,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
