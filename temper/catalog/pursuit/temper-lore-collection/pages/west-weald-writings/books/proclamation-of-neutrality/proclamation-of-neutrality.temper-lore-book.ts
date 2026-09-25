import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const proclamationOfNeutrality = {
  id: "01a0d60d-4ab0-7ce0-9170-84d876ea0670",
  type: "page-type/temper-lore-book",
  slug: "proclamation-of-neutrality",
  title: "Proclamation of Neutrality",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7780,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
