import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFallOfCaracDena = {
  id: "01a0d5f5-1386-7b6d-811b-cea589a51f2b",
  type: "page-type/temper-lore-book",
  slug: "the-fall-of-carac-dena",
  title: "The Fall of Carac Dena",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1801,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
