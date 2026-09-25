import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const incarnateAdurisScroll = {
  id: "01a0d5f7-aa99-7ee1-9205-89397bd47121",
  type: "page-type/temper-lore-book",
  slug: "incarnate-aduris-scroll",
  title: "Incarnate Aduri's Scroll",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4024,
  bookIndex: 89,
  charted: true,
  quest: 5888,
  positions: "jsonl",
} as const satisfies TemperLoreBook
