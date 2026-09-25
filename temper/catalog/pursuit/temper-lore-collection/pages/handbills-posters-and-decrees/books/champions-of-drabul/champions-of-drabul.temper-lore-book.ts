import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const championsOfDrabul = {
  id: "01a0d5f2-83a2-767d-8281-50dd70ab1983",
  type: "page-type/temper-lore-book",
  slug: "champions-of-drabul",
  title: "Champions of Dra'bul",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 776,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
