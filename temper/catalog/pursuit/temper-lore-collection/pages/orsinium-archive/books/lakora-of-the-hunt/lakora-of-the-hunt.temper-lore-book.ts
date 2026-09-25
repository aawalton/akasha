import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lakoraOfTheHunt = {
  id: "01a0d5f7-160b-780b-aaf9-ff5764ec60d0",
  type: "page-type/temper-lore-book",
  slug: "lakora-of-the-hunt",
  title: "Lakora of the Hunt",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3037,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
