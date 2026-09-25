import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfEmperorLeovic = {
  id: "01a0d5f2-253b-72f9-bad7-a91afe11a767",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-emperor-leovic",
  title: "The Journal of Emperor Leovic",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6495,
  bookIndex: 96,
  charted: true,
  quest: 6627,
  positions: "jsonl",
} as const satisfies TemperLoreBook
