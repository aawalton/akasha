import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualsOfContempt = {
  id: "01a0d5f2-253b-7fcd-b228-cfc5a81c6292",
  type: "page-type/temper-lore-book",
  slug: "rituals-of-contempt",
  title: "Rituals of Contempt",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 669,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
