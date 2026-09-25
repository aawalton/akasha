import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePledgeOfObedience = {
  id: "01a0d5f5-abbb-7f9c-975a-36513a9c3570",
  type: "page-type/temper-lore-book",
  slug: "the-pledge-of-obedience",
  title: "The Pledge of Obedience",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2729,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
