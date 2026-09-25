import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uggissarsLament = {
  id: "01a0d5f2-509f-7ab1-b49f-4e4110129e95",
  type: "page-type/temper-lore-book",
  slug: "uggissars-lament",
  title: "Uggissar's Lament",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1335,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
