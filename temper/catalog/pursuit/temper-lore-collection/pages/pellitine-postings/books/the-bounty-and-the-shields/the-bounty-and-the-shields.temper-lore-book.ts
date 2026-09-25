import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBountyAndTheShields = {
  id: "01a0d60b-4e03-77f1-9f7f-2ca5660d7fea",
  type: "page-type/temper-lore-book",
  slug: "the-bounty-and-the-shields",
  title: "The Bounty and the Shields",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5809,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
