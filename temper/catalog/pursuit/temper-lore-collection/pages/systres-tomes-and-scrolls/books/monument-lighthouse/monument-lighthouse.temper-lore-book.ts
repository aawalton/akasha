import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const monumentLighthouse = {
  id: "01a0d60c-75b5-7c9f-9f03-5ffb12aa5829",
  type: "page-type/temper-lore-book",
  slug: "monument-lighthouse",
  title: "Monument Lighthouse",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7181,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
