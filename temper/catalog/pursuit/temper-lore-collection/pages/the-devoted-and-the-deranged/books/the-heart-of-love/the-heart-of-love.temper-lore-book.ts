import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHeartOfLove = {
  id: "01a0d5f5-abbb-7ec7-8e98-f33b0c72a2ee",
  type: "page-type/temper-lore-book",
  slug: "the-heart-of-love",
  title: "The Heart of Love",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 768,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
