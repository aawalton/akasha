import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invitationToOrsinium = {
  id: "01a0d5f7-160b-742a-967b-d946c92e95d2",
  type: "page-type/temper-lore-book",
  slug: "invitation-to-orsinium",
  title: "Invitation to Orsinium",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3224,
  bookIndex: 54,
  charted: true,
  quest: 5450,
  positions: "jsonl",
} as const satisfies TemperLoreBook
