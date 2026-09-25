import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uggissarsDiary = {
  id: "01a0d5f2-509f-7c36-9023-cacca73aaaa6",
  type: "page-type/temper-lore-book",
  slug: "uggissars-diary",
  title: "Uggissar's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1332,
  bookIndex: 31,
  charted: true,
  quest: 4583,
  positions: "jsonl",
} as const satisfies TemperLoreBook
