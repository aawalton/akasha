import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seekAdventureInMurkmire = {
  id: "01a0d5f6-a29a-783e-afff-5a099602c129",
  type: "page-type/temper-lore-book",
  slug: "seek-adventure-in-murkmire",
  title: "Seek Adventure in Murkmire!",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5199,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
