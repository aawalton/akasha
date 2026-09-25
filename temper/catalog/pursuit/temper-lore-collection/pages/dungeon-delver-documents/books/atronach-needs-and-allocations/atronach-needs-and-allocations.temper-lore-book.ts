import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const atronachNeedsAndAllocations = {
  id: "01a0d60d-708d-7d67-b11a-5a0b39d9c4e6",
  type: "page-type/temper-lore-book",
  slug: "atronach-needs-and-allocations",
  title: "Atronach Needs and Allocations",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8485,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
