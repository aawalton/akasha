import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onPlunderSkulls = {
  id: "01a0d5f5-abba-7b32-b9a5-c604d274ce5b",
  type: "page-type/temper-lore-book",
  slug: "on-plunder-skulls",
  title: "On Plunder Skulls",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 5701,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
