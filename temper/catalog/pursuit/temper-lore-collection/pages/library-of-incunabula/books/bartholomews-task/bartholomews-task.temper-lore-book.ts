import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bartholomewsTask = {
  id: "01a0d5f8-02f8-7bd2-90d8-c3472709f1ff",
  type: "page-type/temper-lore-book",
  slug: "bartholomews-task",
  title: "Bartholomew's Task",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6713,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
