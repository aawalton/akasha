import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcsOfTamrielVolume3 = {
  id: "01a0d5f1-c91b-75a9-9864-7acaf9fa084d",
  type: "page-type/temper-lore-book",
  slug: "orcs-of-tamriel-volume-3",
  title: "Orcs of Tamriel, Volume 3",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2585,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
