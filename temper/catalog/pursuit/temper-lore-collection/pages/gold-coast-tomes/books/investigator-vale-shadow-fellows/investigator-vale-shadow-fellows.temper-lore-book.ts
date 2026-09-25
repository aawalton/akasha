import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorValeShadowFellows = {
  id: "01a0d5f7-73fa-7910-b982-66d01a00a8ad",
  type: "page-type/temper-lore-book",
  slug: "investigator-vale-shadow-fellows",
  title: "Investigator Vale: Shadow Fellows",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3532,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
