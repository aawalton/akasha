import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSagaOfCaptainWeresharkVol3 = {
  id: "01a0d60b-fdb1-7d86-8f23-0c61adbd053b",
  type: "page-type/temper-lore-book",
  slug: "the-saga-of-captain-wereshark-vol-3",
  title: "The Saga of Captain Wereshark Vol. 3",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6504,
  bookIndex: 27,
  charted: true,
  quest: 6636,
  positions: "jsonl",
} as const satisfies TemperLoreBook
