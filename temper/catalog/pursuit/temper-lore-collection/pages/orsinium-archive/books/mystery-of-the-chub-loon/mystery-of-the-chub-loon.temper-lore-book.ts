import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysteryOfTheChubLoon = {
  id: "01a0d5f7-160b-7ac5-9a32-734d8709d813",
  type: "page-type/temper-lore-book",
  slug: "mystery-of-the-chub-loon",
  title: "Mystery of the Chub Loon",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3220,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
