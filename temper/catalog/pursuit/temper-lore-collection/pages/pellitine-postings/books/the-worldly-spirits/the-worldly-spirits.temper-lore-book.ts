import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWorldlySpirits = {
  id: "01a0d60b-4e03-7cc3-81bf-2bbc99d20dda",
  type: "page-type/temper-lore-book",
  slug: "the-worldly-spirits",
  title: "The Worldly Spirits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5727,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
