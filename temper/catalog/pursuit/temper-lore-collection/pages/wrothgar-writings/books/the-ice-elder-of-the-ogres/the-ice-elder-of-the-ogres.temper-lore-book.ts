import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theIceElderOfTheOgres = {
  id: "01a0d5f6-d68c-76a6-a96c-bae3572aeabc",
  type: "page-type/temper-lore-book",
  slug: "the-ice-elder-of-the-ogres",
  title: "The Ice Elder of the Ogres",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3194,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
