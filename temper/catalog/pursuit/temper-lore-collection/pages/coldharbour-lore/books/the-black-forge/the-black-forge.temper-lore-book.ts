import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackForge = {
  id: "01a0d5e5-15ef-7903-94dc-d0540fdd3584",
  type: "page-type/temper-lore-book",
  slug: "the-black-forge",
  title: "The Black Forge",
  collection: "temper-lore-collection/coldharbour-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
