import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arcanaRestored = {
  id: "01a0d5e3-fde3-79a5-b3b8-95d21628e601",
  type: "page-type/temper-lore-book",
  slug: "arcana-restored",
  title: "Arcana Restored",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
