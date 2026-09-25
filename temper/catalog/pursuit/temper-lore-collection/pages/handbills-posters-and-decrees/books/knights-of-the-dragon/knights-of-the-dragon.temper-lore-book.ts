import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knightsOfTheDragon = {
  id: "01a0d5f2-83a2-7add-ad25-40ad14028c2a",
  type: "page-type/temper-lore-book",
  slug: "knights-of-the-dragon",
  title: "Knights of the Dragon",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 684,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
