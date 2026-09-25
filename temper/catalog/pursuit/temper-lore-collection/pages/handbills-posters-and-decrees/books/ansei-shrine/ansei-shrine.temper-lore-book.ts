import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anseiShrine = {
  id: "01a0d5f2-83a2-766d-950c-6668ae3e7318",
  type: "page-type/temper-lore-book",
  slug: "ansei-shrine",
  title: "Ansei Shrine",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1753,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
