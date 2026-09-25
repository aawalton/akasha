import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTruthOfMinotaurs = {
  id: "01a0d60a-d5be-7841-b711-dc66fe89bc5c",
  type: "page-type/temper-lore-book",
  slug: "the-truth-of-minotaurs",
  title: "The Truth of Minotaurs",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4999,
  charted: true,
  quest: 6115,
  positions: "jsonl",
} as const satisfies TemperLoreBook
