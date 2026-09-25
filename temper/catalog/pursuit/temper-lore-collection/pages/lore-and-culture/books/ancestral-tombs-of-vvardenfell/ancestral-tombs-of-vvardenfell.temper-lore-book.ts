import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancestralTombsOfVvardenfell = {
  id: "01a0d5f3-3fda-7e63-8c94-fd997747cf41",
  type: "page-type/temper-lore-book",
  slug: "ancestral-tombs-of-vvardenfell",
  title: "Ancestral Tombs of Vvardenfell",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 4572,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
