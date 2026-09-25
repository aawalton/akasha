import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deadMansDrop = {
  id: "01a0d5f5-444b-7c2b-8cd2-76d95e1b7986",
  type: "page-type/temper-lore-book",
  slug: "dead-mans-drop",
  title: "Dead Man's Drop",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1315,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
