import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackwaterWarVolume1 = {
  id: "01a0d5f6-a29a-79af-ad73-e7c60fec1e9f",
  type: "page-type/temper-lore-book",
  slug: "the-blackwater-war-volume-1",
  title: "The Blackwater War, Volume 1",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2814,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
