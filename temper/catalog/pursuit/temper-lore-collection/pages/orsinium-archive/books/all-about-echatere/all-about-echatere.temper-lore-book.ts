import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allAboutEchatere = {
  id: "01a0d5f7-160a-7c35-8bf0-b16e7ceb734f",
  type: "page-type/temper-lore-book",
  slug: "all-about-echatere",
  title: "All About Echatere",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2834,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
