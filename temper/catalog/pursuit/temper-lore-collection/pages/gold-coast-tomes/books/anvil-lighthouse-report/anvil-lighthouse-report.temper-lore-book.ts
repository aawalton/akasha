import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anvilLighthouseReport = {
  id: "01a0d5f7-73f9-7222-90cd-8c93e2035861",
  type: "page-type/temper-lore-book",
  slug: "anvil-lighthouse-report",
  title: "Anvil Lighthouse Report",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3705,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
