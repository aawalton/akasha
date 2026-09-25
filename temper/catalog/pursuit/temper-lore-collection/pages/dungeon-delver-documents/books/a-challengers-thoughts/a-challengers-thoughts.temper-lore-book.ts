import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aChallengersThoughts = {
  id: "01a0d60d-708d-71c3-ae9e-e8a02a804ef9",
  type: "page-type/temper-lore-book",
  slug: "a-challengers-thoughts",
  title: "A Challenger's Thoughts",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7846,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
