import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteWrittenInBlood = {
  id: "01a0d5f2-253b-7aac-ad9d-0f567eca7c14",
  type: "page-type/temper-lore-book",
  slug: "note-written-in-blood",
  title: "Note Written in Blood",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1392,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
