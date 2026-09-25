import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const webCoveredDiary = {
  id: "01a0d5f8-02f9-7125-9064-7f64ec134d84",
  type: "page-type/temper-lore-book",
  slug: "web-covered-diary",
  title: "Web-Covered Diary",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3957,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
