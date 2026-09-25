import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forTheTrackersCompetition = {
  id: "01a0d5f4-c383-7956-87ba-a7b0da7a1afe",
  type: "page-type/temper-lore-book",
  slug: "for-the-trackers-competition",
  title: "For the Tracker's Competition",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1240,
  bookIndex: 39,
  charted: true,
  quest: 4058,
  positions: "jsonl",
} as const satisfies TemperLoreBook
