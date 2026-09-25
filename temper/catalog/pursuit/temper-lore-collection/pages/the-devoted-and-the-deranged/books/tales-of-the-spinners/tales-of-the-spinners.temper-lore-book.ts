import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talesOfTheSpinners = {
  id: "01a0d5f5-abba-75b2-8d84-755ad9286ef1",
  type: "page-type/temper-lore-book",
  slug: "tales-of-the-spinners",
  title: "Tales of the Spinners",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1822,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
