import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lordHollowjacksDreadRealm = {
  id: "01a0d5f2-253b-7e27-8a33-dc15613a3695",
  type: "page-type/temper-lore-book",
  slug: "lord-hollowjacks-dread-realm",
  title: "Lord Hollowjack's Dread Realm",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 5306,
  bookIndex: 93,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 34, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
