import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barkbiteStrongholdShamansList = {
  id: "01a0d5f2-db25-7c26-8fa9-1fb3a448576b",
  type: "page-type/temper-lore-book",
  slug: "barkbite-stronghold-shamans-list",
  title: "Barkbite Stronghold Shaman's List",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1820,
  bookIndex: 65,
  charted: true,
  quest: 4395,
  positions: "jsonl",
} as const satisfies TemperLoreBook
