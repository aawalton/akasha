import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const geelMasDiary = {
  id: "01a0d5f8-02f8-7c5d-b730-63886e2be782",
  type: "page-type/temper-lore-book",
  slug: "geel-mas-diary",
  title: "Geel-Ma's Diary",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3956,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
