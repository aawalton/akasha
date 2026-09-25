import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dranossDiary = {
  id: "01a0d5f8-02f8-773b-abb4-ae559634e63c",
  type: "page-type/temper-lore-book",
  slug: "dranoss-diary",
  title: "Dranos's Diary",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3958,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
