import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forYourNextCelebration = {
  id: "01a0d60c-baf3-79bb-b141-4cded6ef310a",
  type: "page-type/temper-lore-book",
  slug: "for-your-next-celebration",
  title: "For Your Next Celebration",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7310,
  bookIndex: 4,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
