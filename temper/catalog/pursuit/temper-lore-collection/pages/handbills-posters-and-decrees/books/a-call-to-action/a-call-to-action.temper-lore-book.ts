import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCallToAction = {
  id: "01a0d5f2-83a1-703b-ad4b-0fbcf15d3344",
  type: "page-type/temper-lore-book",
  slug: "a-call-to-action",
  title: "A Call to Action!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1303,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
