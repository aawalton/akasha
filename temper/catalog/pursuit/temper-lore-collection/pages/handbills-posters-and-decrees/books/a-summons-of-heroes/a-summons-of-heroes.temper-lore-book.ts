import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSummonsOfHeroes = {
  id: "01a0d5f2-83a2-74d6-84fb-a8b570cc56b3",
  type: "page-type/temper-lore-book",
  slug: "a-summons-of-heroes",
  title: "A Summons of Heroes!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1006,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
