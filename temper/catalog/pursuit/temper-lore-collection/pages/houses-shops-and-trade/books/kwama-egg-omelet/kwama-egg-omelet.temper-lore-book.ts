import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kwamaEggOmelet = {
  id: "01a0d5f2-db26-707c-9f89-f061fb2b698f",
  type: "page-type/temper-lore-book",
  slug: "kwama-egg-omelet",
  title: "Kwama Egg Omelet",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 539,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
