import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wyrdAndDruid = {
  id: "01a0d60c-75b6-7101-9174-5256804c2daf",
  type: "page-type/temper-lore-book",
  slug: "wyrd-and-druid",
  title: "Wyrd and Druid",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7119,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
