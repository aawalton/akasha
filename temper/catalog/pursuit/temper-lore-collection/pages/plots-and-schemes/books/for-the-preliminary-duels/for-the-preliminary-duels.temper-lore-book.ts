import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forThePreliminaryDuels = {
  id: "01a0d5f4-c383-72f5-94eb-ca903a7f17d7",
  type: "page-type/temper-lore-book",
  slug: "for-the-preliminary-duels",
  title: "For the Preliminary Duels",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1243,
  bookIndex: 42,
  charted: true,
  quest: 4058,
  positions: "jsonl",
} as const satisfies TemperLoreBook
