import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jodesBlessing = {
  id: "01a0d5f4-07b8-7b56-b6db-0f68d5e5d518",
  type: "page-type/temper-lore-book",
  slug: "jodes-blessing",
  title: "Jode's Blessing",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5414,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
