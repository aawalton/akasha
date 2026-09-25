import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iceElvesFactOrFiction = {
  id: "01a0d5f5-7766-7216-be79-ed07ec3955f9",
  type: "page-type/temper-lore-book",
  slug: "ice-elves-fact-or-fiction",
  title: "Ice Elves: Fact or Fiction?",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 607,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
