import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alteredMissive = {
  id: "01a0d5f3-0ef7-7198-a77d-111134ea2e3e",
  type: "page-type/temper-lore-book",
  slug: "altered-missive",
  title: "Altered Missive",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1076,
  bookIndex: 34,
  charted: true,
  quest: 4196,
  positions: "jsonl",
} as const satisfies TemperLoreBook
