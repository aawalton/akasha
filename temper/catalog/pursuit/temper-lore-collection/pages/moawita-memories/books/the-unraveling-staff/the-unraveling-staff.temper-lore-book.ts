import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theUnravelingStaff = {
  id: "01a0d60a-f1ed-7357-9209-92b2cde20a53",
  type: "page-type/temper-lore-book",
  slug: "the-unraveling-staff",
  title: "The Unraveling Staff",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4818,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
