import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uldazaansLetter = {
  id: "01a0d60d-156e-7014-98d9-c8ad07c74f11",
  type: "page-type/temper-lore-book",
  slug: "uldazaans-letter",
  title: "Uldazaan's Letter",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7668,
  bookIndex: 52,
  charted: true,
  quest: 7051,
  positions: "jsonl",
} as const satisfies TemperLoreBook
