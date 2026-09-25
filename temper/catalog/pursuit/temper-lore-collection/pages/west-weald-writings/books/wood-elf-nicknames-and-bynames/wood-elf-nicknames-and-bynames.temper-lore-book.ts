import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const woodElfNicknamesAndBynames = {
  id: "01a0d60d-4ab1-73b5-aa60-49496e529c3a",
  type: "page-type/temper-lore-book",
  slug: "wood-elf-nicknames-and-bynames",
  title: "Wood Elf Nicknames and Bynames",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7801,
  bookIndex: 14,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
