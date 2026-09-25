import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weSailForTheHorizon = {
  id: "01a0d60d-9a64-72d9-9068-60acacec4503",
  type: "page-type/temper-lore-book",
  slug: "we-sail-for-the-horizon",
  title: "We Sail for the Horizon",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8156,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
