import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hagrofTheRighteous = {
  id: "01a0d5f3-3fda-7486-8bb0-2ee37f99741a",
  type: "page-type/temper-lore-book",
  slug: "hagrof-the-righteous",
  title: "Hagrof the Righteous",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1111,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
