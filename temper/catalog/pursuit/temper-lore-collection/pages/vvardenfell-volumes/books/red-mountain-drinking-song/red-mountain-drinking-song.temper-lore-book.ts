import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redMountainDrinkingSong = {
  id: "01a0d5f7-aa99-74e8-a42f-66e8e9996acb",
  type: "page-type/temper-lore-book",
  slug: "red-mountain-drinking-song",
  title: "Red Mountain Drinking Song",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4424,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
