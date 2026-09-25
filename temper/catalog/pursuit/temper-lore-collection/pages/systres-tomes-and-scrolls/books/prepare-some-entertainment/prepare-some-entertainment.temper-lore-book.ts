import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prepareSomeEntertainment = {
  id: "01a0d60c-75b6-7933-963d-551595d34dab",
  type: "page-type/temper-lore-book",
  slug: "prepare-some-entertainment",
  title: "Prepare Some Entertainment",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7042,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
