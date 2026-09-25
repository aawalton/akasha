import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDusandar = {
  id: "01a0d5f1-c91a-7883-9e18-c97d87937d09",
  type: "page-type/temper-lore-book",
  slug: "letter-to-dusandar",
  title: "Letter to Dusandar",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2691,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
