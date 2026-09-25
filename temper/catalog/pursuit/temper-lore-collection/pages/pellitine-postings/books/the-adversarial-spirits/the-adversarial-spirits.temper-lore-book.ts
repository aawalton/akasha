import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAdversarialSpirits = {
  id: "01a0d60b-4e03-7503-907a-83dd4a228447",
  type: "page-type/temper-lore-book",
  slug: "the-adversarial-spirits",
  title: "The Adversarial Spirits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5729,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
