import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thadriaxsInstructions = {
  id: "01a0d60c-40c0-7603-b6d1-74de00e62c96",
  type: "page-type/temper-lore-book",
  slug: "thadriaxs-instructions",
  title: "Thadriax's Instructions",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6842,
  bookIndex: 12,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
