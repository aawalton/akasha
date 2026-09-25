import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morilatta = {
  id: "01a0d5f4-07b8-7308-89cc-0237d1168af6",
  type: "page-type/temper-lore-book",
  slug: "morilatta",
  title: "Morilatta",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2155,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
