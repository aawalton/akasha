import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrueNatureOfTheNightMarket = {
  id: "01a0d60e-687f-77d4-9f4c-5df70c4daaa9",
  type: "page-type/temper-lore-book",
  slug: "the-true-nature-of-the-night-market",
  title: "The True Nature of the Night Market",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8663,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
