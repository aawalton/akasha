import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAncientScroll = {
  id: "01a0d5f4-07b7-7e48-ac94-3ce17973fd20",
  type: "page-type/temper-lore-book",
  slug: "an-ancient-scroll",
  title: "An Ancient Scroll",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 851,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
