import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toMyDearFriend = {
  id: "01a0d5f4-07b9-7936-88fb-2bac607e3b03",
  type: "page-type/temper-lore-book",
  slug: "to-my-dear-friend",
  title: "To My Dear Friend",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6244,
  charted: true,
  quest: 6549,
  positions: "jsonl",
} as const satisfies TemperLoreBook
