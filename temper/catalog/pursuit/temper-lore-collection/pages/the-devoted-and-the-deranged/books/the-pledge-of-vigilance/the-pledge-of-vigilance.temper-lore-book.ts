import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePledgeOfVigilance = {
  id: "01a0d5f5-abbb-7aab-b9cd-523aab6868f5",
  type: "page-type/temper-lore-book",
  slug: "the-pledge-of-vigilance",
  title: "The Pledge of Vigilance",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2728,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
