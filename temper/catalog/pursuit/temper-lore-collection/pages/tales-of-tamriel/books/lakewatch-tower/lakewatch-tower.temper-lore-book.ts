import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lakewatchTower = {
  id: "01a0d5f5-7766-76db-8ed0-eef8809bc6e3",
  type: "page-type/temper-lore-book",
  slug: "lakewatch-tower",
  title: "Lakewatch Tower",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2528,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
