import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stoneHuskDissectionLog = {
  id: "01a0d5f5-1385-752f-acd5-9e332c72331f",
  type: "page-type/temper-lore-book",
  slug: "stone-husk-dissection-log",
  title: "Stone Husk Dissection Log",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 5953,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
