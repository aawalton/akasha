import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const worshipOfTheDragonGod = {
  id: "01a0d5f7-73fb-770a-a129-835418fd3ed8",
  type: "page-type/temper-lore-book",
  slug: "worship-of-the-dragon-god",
  title: "Worship of the Dragon God",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3250,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
