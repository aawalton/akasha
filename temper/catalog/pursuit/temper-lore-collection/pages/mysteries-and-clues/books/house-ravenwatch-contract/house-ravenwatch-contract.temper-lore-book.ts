import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRavenwatchContract = {
  id: "01a0d5f4-07b8-7741-911e-c8cdd0b80c3e",
  type: "page-type/temper-lore-book",
  slug: "house-ravenwatch-contract",
  title: "House Ravenwatch Contract",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6276,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
