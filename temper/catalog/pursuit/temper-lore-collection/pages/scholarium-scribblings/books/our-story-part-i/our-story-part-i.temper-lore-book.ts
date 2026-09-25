import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourStoryPartI = {
  id: "01a0d60d-9a63-7d1a-84a7-bd42fb399088",
  type: "page-type/temper-lore-book",
  slug: "our-story-part-i",
  title: "Our Story, Part I",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8160,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
