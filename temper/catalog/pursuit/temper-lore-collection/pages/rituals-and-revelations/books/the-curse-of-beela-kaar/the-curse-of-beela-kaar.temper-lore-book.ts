import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCurseOfBeelaKaar = {
  id: "01a0d5f5-444c-70dc-80b8-ffc44f7a8352",
  type: "page-type/temper-lore-book",
  slug: "the-curse-of-beela-kaar",
  title: "The Curse of Beela-Kaar",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 5266,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
