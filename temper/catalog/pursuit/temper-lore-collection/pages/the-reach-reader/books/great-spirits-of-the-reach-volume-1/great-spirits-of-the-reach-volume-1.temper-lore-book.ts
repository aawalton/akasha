import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greatSpiritsOfTheReachVolume1 = {
  id: "01a0d60b-c958-7697-a941-64ba56f63177",
  type: "page-type/temper-lore-book",
  slug: "great-spirits-of-the-reach-volume-1",
  title: "Great Spirits of the Reach: Volume 1",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6396,
  bookIndex: 34,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 42, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
