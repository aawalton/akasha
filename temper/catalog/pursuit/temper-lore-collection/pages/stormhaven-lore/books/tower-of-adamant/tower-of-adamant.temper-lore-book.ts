import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const towerOfAdamant = {
  id: "01a0d5e2-efe8-77b0-9e90-e4110ec8d5a0",
  type: "page-type/temper-lore-book",
  slug: "tower-of-adamant",
  title: "Tower of Adamant",
  collection: "temper-lore-collection/stormhaven-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
