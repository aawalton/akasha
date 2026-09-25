import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const closedUntilFurtherNotice = {
  id: "01a0d5f1-c91a-75df-941e-5c675f73153a",
  type: "page-type/temper-lore-book",
  slug: "closed-until-further-notice",
  title: "Closed Until Further Notice",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2643,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
