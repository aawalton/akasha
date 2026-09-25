import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinTheRuckus = {
  id: "01a0d60e-687f-7c2d-9b51-a96ce613f568",
  type: "page-type/temper-lore-book",
  slug: "join-the-ruckus",
  title: "Join the Ruckus",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8729,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
