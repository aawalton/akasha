import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reachLoyalistsLetter = {
  id: "01a0d60b-8108-7c2e-9eef-88878b793363",
  type: "page-type/temper-lore-book",
  slug: "reach-loyalists-letter",
  title: "Reach Loyalist's Letter",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5901,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
