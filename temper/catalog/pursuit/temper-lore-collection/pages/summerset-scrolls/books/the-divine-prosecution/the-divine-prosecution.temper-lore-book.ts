import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDivineProsecution = {
  id: "01a0d60a-d5bd-706f-91bf-0f9010821262",
  type: "page-type/temper-lore-book",
  slug: "the-divine-prosecution",
  title: "The Divine Prosecution",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4814,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
