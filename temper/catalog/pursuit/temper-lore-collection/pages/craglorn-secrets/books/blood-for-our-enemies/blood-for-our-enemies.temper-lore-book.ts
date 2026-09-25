import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodForOurEnemies = {
  id: "01a0d5f1-c919-7351-9d45-57247ff2b6f2",
  type: "page-type/temper-lore-book",
  slug: "blood-for-our-enemies",
  title: "Blood for Our Enemies",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2696,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
