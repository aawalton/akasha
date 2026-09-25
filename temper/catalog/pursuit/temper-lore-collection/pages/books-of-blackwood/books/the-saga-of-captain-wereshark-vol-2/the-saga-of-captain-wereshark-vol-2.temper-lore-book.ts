import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSagaOfCaptainWeresharkVol2 = {
  id: "01a0d60b-fdb1-79d6-8877-7c90b20666de",
  type: "page-type/temper-lore-book",
  slug: "the-saga-of-captain-wereshark-vol-2",
  title: "The Saga of Captain Wereshark Vol. 2",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6691,
  bookIndex: 28,
  charted: true,
  quest: 6636,
  positions: "jsonl",
} as const satisfies TemperLoreBook
