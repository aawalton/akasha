import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adventurersAlmanac2ndEdition = {
  id: "01a0d5f8-1fb3-734f-b033-fc9cf86663b7",
  type: "page-type/temper-lore-book",
  slug: "adventurers-almanac-2nd-edition",
  title: "Adventurer's Almanac, 2nd Edition",
  collection: "temper-lore-collection/adventurers-almanac",
  esoBookId: 4911,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
