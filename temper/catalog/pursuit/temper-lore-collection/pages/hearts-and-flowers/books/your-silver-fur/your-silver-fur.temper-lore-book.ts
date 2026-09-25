import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourSilverFur = {
  id: "01a0d5f2-af71-784d-831c-d1655499fad2",
  type: "page-type/temper-lore-book",
  slug: "your-silver-fur",
  title: "Your Silver Fur",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1411,
  bookIndex: 46,
  charted: true,
  quest: 4624,
  positions: "jsonl",
} as const satisfies TemperLoreBook
