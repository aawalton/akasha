import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riteOfPropagation = {
  id: "01a0d60d-4ab0-7eec-80a5-a532844391c2",
  type: "page-type/temper-lore-book",
  slug: "rite-of-propagation",
  title: "Rite of Propagation",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7894,
  bookIndex: 54,
  charted: true,
  quest: 7080,
  positions: "jsonl",
} as const satisfies TemperLoreBook
