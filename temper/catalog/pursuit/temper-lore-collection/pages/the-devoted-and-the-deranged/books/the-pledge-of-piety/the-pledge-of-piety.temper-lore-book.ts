import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePledgeOfPiety = {
  id: "01a0d5f5-abbb-7688-8085-68c04d9580cf",
  type: "page-type/temper-lore-book",
  slug: "the-pledge-of-piety",
  title: "The Pledge of Piety",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2730,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
