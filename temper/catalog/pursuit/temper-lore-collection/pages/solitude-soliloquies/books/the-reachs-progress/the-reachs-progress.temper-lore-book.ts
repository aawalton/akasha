import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theReachsProgress = {
  id: "01a0d60b-8109-710d-ad7c-497cc4de0e93",
  type: "page-type/temper-lore-book",
  slug: "the-reachs-progress",
  title: "The Reach's Progress",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6211,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
