import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morrowindNeedsYou = {
  id: "01a0d5f2-83a2-7d1c-afaa-d19fb37d3934",
  type: "page-type/temper-lore-book",
  slug: "morrowind-needs-you",
  title: "Morrowind Needs You!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4575,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
