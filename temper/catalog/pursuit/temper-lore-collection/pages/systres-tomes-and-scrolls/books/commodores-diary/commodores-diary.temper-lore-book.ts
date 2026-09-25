import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const commodoresDiary = {
  id: "01a0d60c-75b4-70e6-9986-32501c1e563e",
  type: "page-type/temper-lore-book",
  slug: "commodores-diary",
  title: "Commodore's Diary",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6946,
  charted: true,
  quest: 6762,
  positions: "jsonl",
} as const satisfies TemperLoreBook
