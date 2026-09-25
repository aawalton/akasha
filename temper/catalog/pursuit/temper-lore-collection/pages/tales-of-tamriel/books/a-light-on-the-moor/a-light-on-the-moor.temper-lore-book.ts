import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLightOnTheMoor = {
  id: "01a0d5f5-7766-7465-9173-fec8c1cb22a4",
  type: "page-type/temper-lore-book",
  slug: "a-light-on-the-moor",
  title: "A Light on the Moor",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2164,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
