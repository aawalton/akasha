import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stoneGardenDissectionNotes = {
  id: "01a0d5f5-1385-7a5e-87fb-5b0fabad7a6b",
  type: "page-type/temper-lore-book",
  slug: "stone-garden-dissection-notes",
  title: "Stone Garden Dissection Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 6118,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
