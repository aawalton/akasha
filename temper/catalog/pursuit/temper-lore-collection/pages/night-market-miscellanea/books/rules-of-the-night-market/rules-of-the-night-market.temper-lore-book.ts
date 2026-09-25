import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rulesOfTheNightMarket = {
  id: "01a0d60e-687f-764c-b106-6a56aa90c2f8",
  type: "page-type/temper-lore-book",
  slug: "rules-of-the-night-market",
  title: "Rules of the Night Market",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8728,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
