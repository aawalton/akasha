import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theExcavationOfOuze = {
  id: "01a0d5f2-253b-711b-bbcf-7bb56a51ca73",
  type: "page-type/temper-lore-book",
  slug: "the-excavation-of-ouze",
  title: "The Excavation of Ouze",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 404,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
