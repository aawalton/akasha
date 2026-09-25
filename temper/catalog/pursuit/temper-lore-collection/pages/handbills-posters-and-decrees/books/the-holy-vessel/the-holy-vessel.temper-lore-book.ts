import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHolyVessel = {
  id: "01a0d5f2-83a3-72db-b2c7-4b692bca7a54",
  type: "page-type/temper-lore-book",
  slug: "the-holy-vessel",
  title: "The Holy Vessel",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 633,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
