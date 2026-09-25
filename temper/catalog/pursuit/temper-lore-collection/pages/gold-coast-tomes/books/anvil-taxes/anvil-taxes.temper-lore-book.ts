import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anvilTaxes = {
  id: "01a0d5f7-73f9-760a-afd3-339fcb0032ae",
  type: "page-type/temper-lore-book",
  slug: "anvil-taxes",
  title: "Anvil Taxes",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3680,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
