import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chroniclesOfEhtelarVol2 = {
  id: "01a0d5f5-7766-7cef-aa3b-7e9ba15e433e",
  type: "page-type/temper-lore-book",
  slug: "chronicles-of-ehtelar-vol-2",
  title: "Chronicles of Ehtelar, Vol. 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1945,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
