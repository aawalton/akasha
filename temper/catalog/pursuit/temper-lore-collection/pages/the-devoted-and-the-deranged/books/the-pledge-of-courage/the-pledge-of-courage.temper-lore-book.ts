import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePledgeOfCourage = {
  id: "01a0d5f5-abbb-773f-86fa-ce450d422793",
  type: "page-type/temper-lore-book",
  slug: "the-pledge-of-courage",
  title: "The Pledge of Courage",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2727,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
