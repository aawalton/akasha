import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourPackageIsReady = {
  id: "01a0d5f7-73fb-7d97-a459-2991bb0f87cd",
  type: "page-type/temper-lore-book",
  slug: "your-package-is-ready",
  title: "Your Package Is Ready",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3685,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
