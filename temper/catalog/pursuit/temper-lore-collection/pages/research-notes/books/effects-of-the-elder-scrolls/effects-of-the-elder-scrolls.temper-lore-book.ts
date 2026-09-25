import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const effectsOfTheElderScrolls = {
  id: "01a0d5f5-1384-7c12-97c9-fd4f35cebc74",
  type: "page-type/temper-lore-book",
  slug: "effects-of-the-elder-scrolls",
  title: "Effects of the Elder Scrolls",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 880,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
