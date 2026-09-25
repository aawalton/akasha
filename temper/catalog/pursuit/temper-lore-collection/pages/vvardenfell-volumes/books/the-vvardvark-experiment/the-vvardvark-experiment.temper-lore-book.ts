import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theVvardvarkExperiment = {
  id: "01a0d5f7-aa9a-7a96-91ff-0a3ad948647d",
  type: "page-type/temper-lore-book",
  slug: "the-vvardvark-experiment",
  title: "The Vvardvark Experiment",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4499,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
