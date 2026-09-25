import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riseOfTheRedSails = {
  id: "01a0d5f7-73fa-7034-8c42-425f5c46c08a",
  type: "page-type/temper-lore-book",
  slug: "rise-of-the-red-sails",
  title: "Rise of the Red Sails",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3697,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
