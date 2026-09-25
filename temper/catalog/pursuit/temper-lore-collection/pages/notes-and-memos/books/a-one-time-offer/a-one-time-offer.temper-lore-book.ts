import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aOneTimeOffer = {
  id: "01a0d5f4-3c10-76df-a9e8-3a50a484a0bd",
  type: "page-type/temper-lore-book",
  slug: "a-one-time-offer",
  title: "A One-Time Offer",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 4108,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
