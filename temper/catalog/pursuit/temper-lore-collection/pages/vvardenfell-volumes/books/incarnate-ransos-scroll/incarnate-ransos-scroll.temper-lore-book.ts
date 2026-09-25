import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const incarnateRansosScroll = {
  id: "01a0d5f7-aa99-75f9-9ad2-788480262f9f",
  type: "page-type/temper-lore-book",
  slug: "incarnate-ransos-scroll",
  title: "Incarnate Ranso's Scroll",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4023,
  bookIndex: 88,
  charted: true,
  quest: 5888,
  positions: "jsonl",
} as const satisfies TemperLoreBook
