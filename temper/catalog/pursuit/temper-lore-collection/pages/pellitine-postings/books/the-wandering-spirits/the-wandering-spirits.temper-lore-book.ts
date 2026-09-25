import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWanderingSpirits = {
  id: "01a0d60b-4e03-74bc-997f-63f85a7e4604",
  type: "page-type/temper-lore-book",
  slug: "the-wandering-spirits",
  title: "The Wandering Spirits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5728,
  bookIndex: 60,
  charted: true,
  quest: 6403,
  positions: "jsonl",
} as const satisfies TemperLoreBook
