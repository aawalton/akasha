import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const initiatesThirdNote = {
  id: "01a0d5f2-253a-747b-a34c-0bce15f49862",
  type: "page-type/temper-lore-book",
  slug: "initiates-third-note",
  title: "Initiate's Third Note",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1857,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
