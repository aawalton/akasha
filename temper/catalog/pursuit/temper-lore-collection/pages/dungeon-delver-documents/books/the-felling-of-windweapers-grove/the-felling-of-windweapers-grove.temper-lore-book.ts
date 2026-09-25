import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFellingOfWindweapersGrove = {
  id: "01a0d60d-708e-77b5-ade1-4648b2ebdd92",
  type: "page-type/temper-lore-book",
  slug: "the-felling-of-windweapers-grove",
  title: "The Felling of Windweaper's Grove",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7799,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
