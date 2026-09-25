import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reachHuntingHymn = {
  id: "01a0d60b-c958-74e2-bf8a-7d6718191490",
  type: "page-type/temper-lore-book",
  slug: "reach-hunting-hymn",
  title: "Reach Hunting Hymn",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6365,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
