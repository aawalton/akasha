import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const battleOfFalinesti = {
  id: "01a0d5f4-07b7-73bd-b858-2052fcb37d50",
  type: "page-type/temper-lore-book",
  slug: "battle-of-falinesti",
  title: "Battle of Falinesti",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1575,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
