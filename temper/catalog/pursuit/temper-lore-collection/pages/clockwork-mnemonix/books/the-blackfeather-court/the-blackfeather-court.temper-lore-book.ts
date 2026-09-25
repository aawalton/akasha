import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackfeatherCourt = {
  id: "01a0d60a-a214-7348-9a77-5496b1a8609f",
  type: "page-type/temper-lore-book",
  slug: "the-blackfeather-court",
  title: "The Blackfeather Court",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4577,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
