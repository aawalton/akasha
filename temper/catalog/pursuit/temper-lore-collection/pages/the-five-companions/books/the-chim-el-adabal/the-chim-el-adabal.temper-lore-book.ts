import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theChimElAdabal = {
  id: "01a0d5f5-c96e-78ec-933b-1fd8e8fe249d",
  type: "page-type/temper-lore-book",
  slug: "the-chim-el-adabal",
  title: "The Chim-el Adabal",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1619,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
