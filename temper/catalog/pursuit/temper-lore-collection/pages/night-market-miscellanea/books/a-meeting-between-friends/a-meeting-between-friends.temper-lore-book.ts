import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aMeetingBetweenFriends = {
  id: "01a0d60e-687e-796c-9a5f-d51ebc724f2c",
  type: "page-type/temper-lore-book",
  slug: "a-meeting-between-friends",
  title: "A Meeting Between Friends",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8722,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
