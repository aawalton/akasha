import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToYazara = {
  id: "01a0d5f7-160b-73c8-85b3-94c792e9273c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-yazara",
  title: "Letter to Yazara",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2836,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
