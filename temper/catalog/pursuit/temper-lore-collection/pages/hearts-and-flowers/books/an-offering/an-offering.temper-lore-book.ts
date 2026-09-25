import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anOffering = {
  id: "01a0d5f2-af6f-7aa4-9bb2-a0d12fb61c64",
  type: "page-type/temper-lore-book",
  slug: "an-offering",
  title: "An Offering",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 994,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
