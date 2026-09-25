import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talesOfTributeSeriesOne = {
  id: "01a0d60c-75b6-77cd-b921-f42980b4a4fc",
  type: "page-type/temper-lore-book",
  slug: "tales-of-tribute-series-one",
  title: "Tales of Tribute: Series One",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7263,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
