import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNineCoruscationsVolumeI = {
  id: "01a0d5f2-253b-72ee-a218-49784cc4bf26",
  type: "page-type/temper-lore-book",
  slug: "the-nine-coruscations-volume-i",
  title: "The Nine Coruscations, Volume I",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7938,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
