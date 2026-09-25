import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thereIsNoGoingBack = {
  id: "01a0d5f2-253c-718b-a301-d369ae8f9663",
  type: "page-type/temper-lore-book",
  slug: "there-is-no-going-back",
  title: "There Is No Going Back",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1069,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
