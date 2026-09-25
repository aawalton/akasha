import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scribingForTheDaggerfallCovenant = {
  id: "01a0d60d-9a64-7ac6-87a2-e52d355f5b5e",
  type: "page-type/temper-lore-book",
  slug: "scribing-for-the-daggerfall-covenant",
  title: "Scribing for the Daggerfall Covenant",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8298,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
