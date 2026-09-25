import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tamrielicTwinsOfMyth = {
  id: "01a0d60d-156e-7997-a5dc-00cc9065b0a1",
  type: "page-type/temper-lore-book",
  slug: "tamrielic-twins-of-myth",
  title: "Tamrielic Twins of Myth",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7559,
  bookIndex: 38,
  charted: true,
  quest: 6981,
  positions: "jsonl",
} as const satisfies TemperLoreBook
