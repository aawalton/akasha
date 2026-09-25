import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const initiatesSecondNote = {
  id: "01a0d5f2-253a-7232-a2dc-91963676acc3",
  type: "page-type/temper-lore-book",
  slug: "initiates-second-note",
  title: "Initiate's Second Note",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1856,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
