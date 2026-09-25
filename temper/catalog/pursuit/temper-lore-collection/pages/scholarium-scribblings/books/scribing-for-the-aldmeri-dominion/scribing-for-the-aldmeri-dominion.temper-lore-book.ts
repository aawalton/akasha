import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scribingForTheAldmeriDominion = {
  id: "01a0d60d-9a64-788a-957c-63d92c911a30",
  type: "page-type/temper-lore-book",
  slug: "scribing-for-the-aldmeri-dominion",
  title: "Scribing for the Aldmeri Dominion",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8294,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
