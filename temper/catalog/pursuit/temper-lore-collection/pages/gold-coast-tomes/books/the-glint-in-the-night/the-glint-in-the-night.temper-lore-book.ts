import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGlintInTheNight = {
  id: "01a0d5f7-73fb-7cd6-96cf-a106e7c4071f",
  type: "page-type/temper-lore-book",
  slug: "the-glint-in-the-night",
  title: "The Glint in the Night",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3701,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
