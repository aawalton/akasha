import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const leaveThisPlace = {
  id: "01a0d5f3-0ef7-7d2e-b283-43d74f7cc055",
  type: "page-type/temper-lore-book",
  slug: "leave-this-place",
  title: "Leave This Place",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2067,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
