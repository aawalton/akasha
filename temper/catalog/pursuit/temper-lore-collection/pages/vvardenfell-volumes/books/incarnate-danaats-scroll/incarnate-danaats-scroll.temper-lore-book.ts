import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const incarnateDanaatsScroll = {
  id: "01a0d5f7-aa99-70af-832c-b7cda709eaa4",
  type: "page-type/temper-lore-book",
  slug: "incarnate-danaats-scroll",
  title: "Incarnate Danaat's Scroll",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4025,
  bookIndex: 90,
  charted: true,
  quest: 5888,
  positions: "jsonl",
} as const satisfies TemperLoreBook
