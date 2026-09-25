import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fromOldLifeToNew = {
  id: "01a0d5f3-3fda-7c73-8f42-5259826f8e0b",
  type: "page-type/temper-lore-book",
  slug: "from-old-life-to-new",
  title: "From Old Life To New",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 4022,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
