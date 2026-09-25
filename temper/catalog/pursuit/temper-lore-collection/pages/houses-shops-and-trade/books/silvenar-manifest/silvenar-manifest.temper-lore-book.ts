import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const silvenarManifest = {
  id: "01a0d5f2-db26-73e4-83c1-f619934452f3",
  type: "page-type/temper-lore-book",
  slug: "silvenar-manifest",
  title: "Silvenar Manifest",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 597,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
