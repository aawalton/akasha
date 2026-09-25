import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nevenasDiary = {
  id: "01a0d5f2-509f-7f9a-addc-dd011046c6a7",
  type: "page-type/temper-lore-book",
  slug: "nevenas-diary",
  title: "Nevena's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 4493,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
